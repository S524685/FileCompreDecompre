<?php
  session_start();
?>
<!DOCTYPE html>
<html>
<head>

</head>
<link rel='stylesheet' href='css/admin.css'>

<body>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>John Doe</td>
        <td>
          <div class="dropdown">
            <button class="dropdown-btn">Options</button>
            <div class="dropdown-content">
              <a href="#">Delete</a>
              <a href="#">Update</a>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        
      <!-- Add more rows as needed -->
    </tbody>
  </table>
</body>
</html>

