async function testAPIDirect() {
  try {
    console.log("🧪 Testing API endpoint directly...");

    // First, let's test if the server is responding
    const healthCheck = await fetch("http://localhost:3000/api/stats");
    console.log(`Health check status: ${healthCheck.status}`);

    if (healthCheck.ok) {
      console.log("✅ Server is responding");
    } else {
      console.log("❌ Server is not responding properly");
      return;
    }

    // Now test the verify-code endpoint
    console.log("\n📝 Testing verify-code endpoint...");

    const testData = {
      lessonId: "cmey9z96q0001uhacdlbf5keu", // This is the Python lesson ID we found
      code: "name = 'Alice'\nage = 25",
      language: "python",
    };

    console.log("Sending data:", JSON.stringify(testData, null, 2));

    const response = await fetch("http://localhost:3000/api/verify-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
    });

    console.log(`Response status: ${response.status}`);
    console.log(
      `Response headers:`,
      Object.fromEntries(response.headers.entries())
    );

    const responseText = await response.text();
    console.log(`Response body: ${responseText}`);

    if (response.ok) {
      const result = JSON.parse(responseText);
      console.log("\n✅ API Response:");
      console.log(JSON.stringify(result, null, 2));
    } else {
      console.log(`❌ API Error: ${response.status} - ${responseText}`);
    }
  } catch (error) {
    console.error("❌ Test error:", error);
  }
}

// Run the test
testAPIDirect();
