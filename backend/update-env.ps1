$envPath = "c:\projects\mern-ecommerce\backend\.env"
$newMongoUri = "MONGO_URI=mongodb+srv://22tec2cs182_db_user:Anish%409661@cluster0.ljhvkyu.mongodb.net/krishisathi?retryWrites=true&w=majority"

# Read the current .env file
$content = Get-Content $envPath

# Replace the MONGO_URI line
$newContent = $content | ForEach-Object {
    if ($_ -match "^MONGO_URI=") {
        $newMongoUri
    } else {
        $_
    }
}

# Write back to .env
$newContent | Set-Content $envPath

Write-Host "✅ Updated MONGO_URI in .env file"
Write-Host "Connection string: $newMongoUri"
