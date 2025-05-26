<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>New Enrollment Submission</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f6f8fa;
            margin: 0;
            padding: 0;
        }
        .email-container {
            background: #fff;
            max-width: 600px;
            margin: 30px auto;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(44,62,80,0.08);
            padding: 32px 24px;
        }
        h2, h3 {
            color: #2c3e50;
            margin-top: 0;
        }
        ul {
            padding-left: 20px;
        }
        li {
            margin-bottom: 18px;
            background: #f2f4f8;
            border-radius: 5px;
            padding: 12px 16px;
        }
        strong {
            color: #34495e;
        }
        .footer {
            margin-top: 32px;
            font-size: 13px;
            color: #888;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <h2>New Enrollment Submission</h2>

        <p><strong>Parent Name:</strong> {{ $parent->name }}</p>
        <p><strong>Email:</strong> {{ $parent->email }}</p>
        <p><strong>Contact Number:</strong> {{ $parent->contact_number }}</p>
        <p><strong>Relationship:</strong> {{ $parent->relationship }}</p>

        <h3>Children Enrolled:</h3>
        <ul>
            @foreach ($children as $child)
                <li>
                    <strong>Name:</strong> {{ $child->name }}<br>
                    <strong>Date of Birth:</strong> {{ \Carbon\Carbon::parse($child->date_of_birth)->format('F j, Y') }}<br>
                    <strong>LRN/Student ID:</strong> {{ $child->lrn_or_student_id }}
                </li>
            @endforeach
        </ul>

        <div class="footer">
            This is an automated notification from the Enrollment System.
        </div>
    </div>
</body>
</html>
