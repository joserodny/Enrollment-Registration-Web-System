<!DOCTYPE html>
<html>
<head>
    <title>Enrollment Confirmation</title>
</head>
<body>
    <h1>Hello, {{ $user->name }}</h1>
    <p>Thank you for enrolling. Please confirm your enrollment by clicking the link below:</p>
    <p><a href="{{ $link }}">{{ $link }}</a></p>
</body>
</html>
