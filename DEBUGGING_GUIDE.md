# Frontend Debugging Guide for toString() Error

## What I've Fixed So Far:
1. ✅ Updated Vite proxy to use port 8080 (vite.config.js)
2. ✅ Updated backend server port to 8080 (application.properties)
3. ✅ Added defensive checks for department ID conversions in CreateEmployee, Register, UpdateEmployee
4. ✅ Added defensive salary formatting in EmployeeList and EmployeeProfile

## To Resolve Remaining toString() Error:

### Step 1: Open Developer Tools
- Press **F12** in your browser
- Go to **Console** tab (shows JavaScript errors)
- Go to **Network** tab (shows API requests)

### Step 2: Check API Responses
1. Refresh the page (F5)
2. In the **Network** tab, look for requests like:
   - `/api/departments` - should return array of departments
   - `/api/dashboard/stats` - should return stats object
   - `/api/v1/employees` - should return employees data

3. Click each request and check the **Response** tab
4. Verify the response data structure matches expectations:

**Expected Department Response:**
```json
[
  {"id": 1, "deptName": "Engineering"},
  {"id": 2, "deptName": "HR"}
]
```

**Expected Dashboard Stats Response:**
```json
{
  "totalEmployees": 10,
  "totalDepartments": 3,
  "pendingLeaves": 2,
  "approvedLeaves": 15
}
```

### Step 3: Check Backend Logs
1. Go to your backend terminal where Spring Boot is running
2. Look for any ERROR messages
3. Ensure the database connection is working (check PostgreSQL is running)

### Step 4: Verify Backend is Running
Run this command in PowerShell:
```powershell
# Check if port 8080 is listening
netstat -ano | findstr :8080
```

If nothing shows, the backend might not be running:
```powershell
# Navigate to backend directory
cd D:\Projects\Emp-mng-System-crud\Emp-mng-sys

# Build and run
mvn clean install
mvn spring-boot:run
```

### Step 5: Check Frontend Console Errors
In the browser Console tab, look for patterns like:
- `Failed to fetch` - backend not responding
- `CORS error` - cross-origin request blocked
- `Cannot read property` - data structure mismatch

## If Error Still Occurs After These Steps:

1. **Share browser screenshot** of the Console error
2. **Share a Network tab screenshot** showing failed API requests
3. **Share backend logs** showing any errors

## Common Causes:
- ❌ Backend not running on port 8080
- ❌ Database connection failed
- ❌ API returning empty or error responses
- ❌ CORS configuration issues
