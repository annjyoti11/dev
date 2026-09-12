<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ $title ?? 'Admin' }} — Zenith Global Senior Secondary School</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="z-app">
    <div class="z-shell" x-data="{ sidebarOpen: true }">
        <x-admin.sidebar />
        <div class="z-main">
            <x-admin.topbar />
            <main class="z-content" id="main-content">{{ $slot }}</main>
        </div>
        <x-ui.toast-stack />
        <x-ui.confirm-modal />
    </div>
</body>
</html>
