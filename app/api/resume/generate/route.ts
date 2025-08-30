import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

interface ResumeData {
  personalInfo: {
    name: string
    email: string
    location?: string
    website?: string
    github?: string
    linkedin?: string
    bio?: string
  }
  education: {
    institution: string
    degree: string
    field: string
    startDate: string
    endDate?: string
    description?: string
  }[]
  experience: {
    company: string
    position: string
    startDate: string
    endDate?: string
    description: string
    technologies: string[]
  }[]
  skills: {
    category: string
    skills: string[]
  }[]
  projects: {
    title: string
    description: string
    technologies: string[]
    githubUrl?: string
    liveUrl?: string
  }[]
  certifications: {
    title: string
    issuer: string
    date: string
    description?: string
  }[]
  achievements: {
    title: string
    description: string
    date: string
  }[]
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { template = 'modern', includeProjects = true, includeCertifications = true } = await request.json()

    // Fetch user data
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        progress: {
          include: {
            lesson: {
              include: { language: true }
            }
          }
        },
        projects: true,
        skills: true,
        certifications: true,
        trophies: true
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Build resume data
    const resumeData: ResumeData = {
      personalInfo: {
        name: user.name || 'Your Name',
        email: user.email || '',
        location: user.location,
        website: user.website,
        github: user.github,
        linkedin: user.linkedin,
        bio: user.bio
      },
      education: [
        {
          institution: 'LearnMe Platform',
          degree: 'Self-Taught Developer',
          field: 'Software Development',
          startDate: user.createdAt.toISOString().split('T')[0],
          description: 'Comprehensive programming education through interactive lessons and project-based learning'
        }
      ],
      experience: [], // Will be populated from projects if needed
      skills: [],
      projects: [],
      certifications: [],
      achievements: []
    }

    // Process skills
    if (user.skills.length > 0) {
      const skillCategories = ['programming', 'framework', 'tool', 'soft-skill']
      skillCategories.forEach(category => {
        const categorySkills = user.skills
          .filter(skill => skill.category === category)
          .sort((a, b) => b.proficiency - a.proficiency)
          .map(skill => skill.name)
        
        if (categorySkills.length > 0) {
          resumeData.skills.push({
            category: category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' '),
            skills: categorySkills
          })
        }
      })
    }

    // Process projects
    if (includeProjects && user.projects.length > 0) {
      resumeData.projects = user.projects
        .filter(project => project.isPublic)
        .map(project => ({
          title: project.title,
          description: project.description,
          technologies: JSON.parse(project.technologies || '[]'),
          githubUrl: project.githubUrl,
          liveUrl: project.liveUrl
        }))
        .slice(0, 5) // Limit to top 5 projects
    }

    // Process certifications
    if (includeCertifications && user.certifications.length > 0) {
      resumeData.certifications = user.certifications
        .filter(cert => cert.isVerified)
        .map(cert => ({
          title: cert.title,
          issuer: 'LearnMe Platform',
          date: cert.issuedAt.toISOString().split('T')[0],
          description: cert.description
        }))
    }

    // Process achievements from trophies
    if (user.trophies.length > 0) {
      resumeData.achievements = user.trophies
        .map(trophy => ({
          title: trophy.title,
          description: trophy.description,
          date: trophy.earnedAt.toISOString().split('T')[0]
        }))
        .slice(0, 10) // Limit to top 10 achievements
    }

    // Generate experience from projects if no real experience
    if (resumeData.projects.length > 0) {
      resumeData.experience = resumeData.projects.slice(0, 3).map(project => ({
        company: 'Personal Projects',
        position: 'Full Stack Developer',
        startDate: user.createdAt.toISOString().split('T')[0],
        description: project.description,
        technologies: project.technologies
      }))
    }

    // Generate resume HTML based on template
    const resumeHtml = generateResumeHTML(resumeData, template)

    return NextResponse.json({
      success: true,
      resumeData,
      html: resumeHtml
    })

  } catch (error) {
    console.error('Resume generation error:', error)
    return NextResponse.json({ error: 'Failed to generate resume' }, { status: 500 })
  }
}

function generateResumeHTML(data: ResumeData, template: string): string {
  const { personalInfo, education, experience, skills, projects, certifications, achievements } = data

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${personalInfo.name} - Resume</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .resume { max-width: 800px; margin: 0 auto; padding: 40px; background: white; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #2b79ff; padding-bottom: 20px; }
        .name { font-size: 2.5em; font-weight: bold; color: #2b79ff; margin-bottom: 10px; }
        .contact { font-size: 1.1em; color: #666; }
        .section { margin-bottom: 25px; }
        .section-title { font-size: 1.5em; font-weight: bold; color: #2b79ff; margin-bottom: 15px; border-bottom: 2px solid #eee; padding-bottom: 5px; }
        .item { margin-bottom: 15px; }
        .item-title { font-weight: bold; font-size: 1.1em; }
        .item-subtitle { color: #666; font-style: italic; }
        .item-date { color: #999; font-size: 0.9em; }
        .skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; }
        .skill-category { margin-bottom: 15px; }
        .skill-category h4 { color: #2b79ff; margin-bottom: 5px; }
        .skill-list { display: flex; flex-wrap: wrap; gap: 5px; }
        .skill-tag { background: #eef6ff; color: #2b79ff; padding: 3px 8px; border-radius: 12px; font-size: 0.9em; }
        .project-grid { display: grid; gap: 15px; }
        .project-item { border: 1px solid #eee; padding: 15px; border-radius: 8px; }
        .project-links { margin-top: 10px; }
        .project-links a { color: #2b79ff; text-decoration: none; margin-right: 15px; }
        .project-links a:hover { text-decoration: underline; }
        @media print { .resume { box-shadow: none; } }
    </style>
</head>
<body>
    <div class="resume">
        <div class="header">
            <div class="name">${personalInfo.name}</div>
            <div class="contact">
                ${personalInfo.email} | ${personalInfo.location || 'Location'} 
                ${personalInfo.website ? `| <a href="${personalInfo.website}">${personalInfo.website}</a>` : ''}
                ${personalInfo.github ? `| <a href="${personalInfo.github}">GitHub</a>` : ''}
                ${personalInfo.linkedin ? `| <a href="${personalInfo.linkedin}">LinkedIn</a>` : ''}
            </div>
            ${personalInfo.bio ? `<div style="margin-top: 10px; font-style: italic;">${personalInfo.bio}</div>` : ''}
        </div>

        ${skills.length > 0 ? `
        <div class="section">
            <div class="section-title">Skills</div>
            <div class="skills-grid">
                ${skills.map(category => `
                    <div class="skill-category">
                        <h4>${category.category}</h4>
                        <div class="skill-list">
                            ${category.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        ` : ''}

        ${projects.length > 0 ? `
        <div class="section">
            <div class="section-title">Projects</div>
            <div class="project-grid">
                ${projects.map(project => `
                    <div class="project-item">
                        <div class="item-title">${project.title}</div>
                        <div class="item-subtitle">${project.technologies.join(', ')}</div>
                        <div style="margin: 10px 0;">${project.description}</div>
                        <div class="project-links">
                            ${project.githubUrl ? `<a href="${project.githubUrl}">GitHub</a>` : ''}
                            ${project.liveUrl ? `<a href="${project.liveUrl}">Live Demo</a>` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        ` : ''}

        ${experience.length > 0 ? `
        <div class="section">
            <div class="section-title">Experience</div>
            ${experience.map(exp => `
                <div class="item">
                    <div class="item-title">${exp.position}</div>
                    <div class="item-subtitle">${exp.company}</div>
                    <div class="item-date">${exp.startDate} - ${exp.endDate || 'Present'}</div>
                    <div style="margin-top: 5px;">${exp.description}</div>
                    <div style="margin-top: 5px; color: #666;">Technologies: ${exp.technologies.join(', ')}</div>
                </div>
            `).join('')}
        </div>
        ` : ''}

        ${education.length > 0 ? `
        <div class="section">
            <div class="section-title">Education</div>
            ${education.map(edu => `
                <div class="item">
                    <div class="item-title">${edu.degree} in ${edu.field}</div>
                    <div class="item-subtitle">${edu.institution}</div>
                    <div class="item-date">${edu.startDate} - ${edu.endDate || 'Present'}</div>
                    ${edu.description ? `<div style="margin-top: 5px;">${edu.description}</div>` : ''}
                </div>
            `).join('')}
        </div>
        ` : ''}

        ${certifications.length > 0 ? `
        <div class="section">
            <div class="section-title">Certifications</div>
            ${certifications.map(cert => `
                <div class="item">
                    <div class="item-title">${cert.title}</div>
                    <div class="item-subtitle">${cert.issuer}</div>
                    <div class="item-date">${cert.date}</div>
                    ${cert.description ? `<div style="margin-top: 5px;">${cert.description}</div>` : ''}
                </div>
            `).join('')}
        </div>
        ` : ''}

        ${achievements.length > 0 ? `
        <div class="section">
            <div class="section-title">Achievements</div>
            ${achievements.map(achievement => `
                <div class="item">
                    <div class="item-title">${achievement.title}</div>
                    <div class="item-date">${achievement.date}</div>
                    <div style="margin-top: 5px;">${achievement.description}</div>
                </div>
            `).join('')}
        </div>
        ` : ''}
    </div>
</body>
</html>
  `
}
