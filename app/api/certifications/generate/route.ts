import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

interface CertificateData {
  certificateId: string
  userName: string
  courseName: string
  language: string
  completionDate: string
  score: number
  totalLessons: number
  completedLessons: number
  verificationUrl: string
  issuedBy: string
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { languageSlug, courseName } = await request.json()

    // Fetch user and their progress for the specific language
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        progress: {
          where: {
            lesson: {
              language: {
                slug: languageSlug
              }
            }
          },
          include: {
            lesson: {
              include: {
                language: true
              }
            }
          }
        }
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check if user has completed enough lessons (minimum 80% completion)
    const totalLessons = await prisma.lesson.count({
      where: {
        language: {
          slug: languageSlug
        }
      }
    })

    const completedLessons = user.progress.length
    const completionPercentage = (completedLessons / totalLessons) * 100

    if (completionPercentage < 80) {
      return NextResponse.json({ 
        error: 'Insufficient completion rate',
        required: 80,
        current: Math.round(completionPercentage)
      }, { status: 400 })
    }

    // Calculate average score
    const totalScore = user.progress.reduce((sum, p) => sum + p.score, 0)
    const averageScore = Math.round(totalScore / completedLessons)

    // Generate unique certificate ID
    const certificateId = `CERT-${languageSlug.toUpperCase()}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Create verification URL
    const verificationUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3001'}/verify/${certificateId}`

    const certificateData: CertificateData = {
      certificateId,
      userName: user.name || user.email || 'Student',
      courseName: courseName || `${languageSlug.toUpperCase()} Programming Course`,
      language: languageSlug,
      completionDate: new Date().toISOString().split('T')[0],
      score: averageScore,
      totalLessons,
      completedLessons,
      verificationUrl,
      issuedBy: 'LearnMe Platform'
    }

    // Save certificate to database
    const certificate = await prisma.certification.create({
      data: {
        userId: user.id,
        title: certificateData.courseName,
        description: `Successfully completed ${certificateData.courseName} with ${averageScore}% average score`,
        language: languageSlug,
        issuedAt: new Date(),
        certificateUrl: verificationUrl,
        isVerified: true
      }
    })

    // Generate certificate HTML
    const certificateHtml = generateCertificateHTML(certificateData)

    return NextResponse.json({
      success: true,
      certificate: certificate,
      certificateData,
      html: certificateHtml
    })

  } catch (error) {
    console.error('Certificate generation error:', error)
    return NextResponse.json({ error: 'Failed to generate certificate' }, { status: 500 })
  }
}

function generateCertificateHTML(data: CertificateData): string {
  const { certificateId, userName, courseName, completionDate, score, verificationUrl } = data

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Certificate of Completion - ${courseName}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Georgia', serif; 
            line-height: 1.6; 
            color: #2c3e50; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .certificate { 
            max-width: 900px; 
            background: white; 
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            overflow: hidden;
            position: relative;
        }
        .certificate::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 8px;
            background: linear-gradient(90deg, #667eea, #764ba2, #f093fb, #f5576c);
        }
        .header { 
            text-align: center; 
            padding: 40px 40px 20px;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        }
        .logo { 
            font-size: 2.5em; 
            font-weight: bold; 
            color: #667eea; 
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }
        .title { 
            font-size: 1.2em; 
            color: #6c757d; 
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        .main-content { 
            padding: 40px; 
            text-align: center;
            position: relative;
        }
        .main-content::before {
            content: '🏆';
            position: absolute;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 4em;
            opacity: 0.1;
        }
        .award-text { 
            font-size: 1.8em; 
            font-weight: bold; 
            color: #2c3e50; 
            margin-bottom: 20px;
            line-height: 1.3;
        }
        .recipient { 
            font-size: 2.5em; 
            font-weight: bold; 
            color: #667eea; 
            margin: 30px 0;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
        }
        .course-name { 
            font-size: 1.4em; 
            color: #495057; 
            margin-bottom: 20px;
            font-style: italic;
        }
        .completion-date { 
            font-size: 1.1em; 
            color: #6c757d; 
            margin-bottom: 30px;
        }
        .score { 
            font-size: 1.2em; 
            color: #28a745; 
            font-weight: bold;
            margin-bottom: 30px;
        }
        .footer { 
            padding: 30px 40px; 
            background: #f8f9fa;
            border-top: 1px solid #dee2e6;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .signature { 
            text-align: center;
        }
        .signature-line { 
            width: 200px; 
            height: 2px; 
            background: #667eea; 
            margin: 10px auto;
        }
        .verification { 
            text-align: right;
            font-size: 0.9em;
            color: #6c757d;
        }
        .certificate-id { 
            font-family: monospace; 
            background: #e9ecef; 
            padding: 5px 10px; 
            border-radius: 5px;
            margin-top: 5px;
        }
        .qr-placeholder {
            width: 80px;
            height: 80px;
            background: #e9ecef;
            border: 2px dashed #6c757d;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.8em;
            color: #6c757d;
            margin-left: auto;
        }
        @media print { 
            body { background: white; }
            .certificate { box-shadow: none; border: 2px solid #667eea; }
        }
    </style>
</head>
<body>
    <div class="certificate">
        <div class="header">
            <div class="logo">LearnMe</div>
            <div class="title">Certificate of Completion</div>
        </div>
        
        <div class="main-content">
            <div class="award-text">This is to certify that</div>
            <div class="recipient">${userName}</div>
            <div class="award-text">has successfully completed the course</div>
            <div class="course-name">${courseName}</div>
            <div class="completion-date">Completed on ${completionDate}</div>
            <div class="score">Achievement Score: ${score}%</div>
        </div>
        
        <div class="footer">
            <div class="signature">
                <div class="signature-line"></div>
                <div style="font-weight: bold; color: #667eea;">LearnMe Platform</div>
                <div style="font-size: 0.9em; color: #6c757d;">Issuing Authority</div>
            </div>
            
            <div class="verification">
                <div>Certificate ID:</div>
                <div class="certificate-id">${certificateId}</div>
                <div style="margin-top: 10px;">Verify at:</div>
                <div style="font-size: 0.8em; word-break: break-all;">${verificationUrl}</div>
                <div class="qr-placeholder">QR Code</div>
            </div>
        </div>
    </div>
</body>
</html>
  `
}
