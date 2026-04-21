const run = async () => {
    try {
        console.log("Fetching products...");
        const prodRes = await fetch("http://localhost:5000/api/products");
        const products = await prodRes.json();
        console.log(`Products count: ${products.length}`);
        
        console.log("\nLogging in...");
        const loginRes = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ email: "anish.k.m9661@gmail.com", password: "Anish@9661" })
        });
        const loginData = await loginRes.json();
        console.log("Login response status:", loginRes.status);
        console.log("Login data:", loginData);
    } catch(err) {
        console.error(err);
    }
};
run();
