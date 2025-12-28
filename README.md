php -S localhost:8000

# ProScapes Website (VS Code Workspace)

## Server Routing Verification

- Current docroot assumption: `public/` (based on relocating `q.php`).
- Observed files in `public/`: `index.php`, `q.php`, `css/`, and `images/`.
- No `.htaccess` routing rules are present in the repo.
- Several `index.php` files exist under `view/` (e.g., `view/services/index.php`, `view/contacts/index.php`), suggesting per-section entry points rather than a single front controller.

## `public/q.php` Endpoint

- Purpose: on request with `?wpth`, it returns the string `./public/index.php`.
- Location: `public/q.php` (moved from repository root).

## How to Test Locally

If PHP is installed, you can serve the `public/` directory and hit the endpoint:

```powershell
Set-Location "c:\Users\worsh\OneDrive\Documents\ProScapes\Website\vs_code"
php -S localhost:8000 -t public
```

Then in a second terminal:

```powershell
Invoke-WebRequest "http://localhost:8000/q.php?wpth" | Select-Object -ExpandProperty Content
```

Expected output:

```
./public/index.php
```

You can also test the homepage:

```powershell
Invoke-WebRequest "http://localhost:8000/" | Select-Object -ExpandProperty StatusCode
```

Expected: `200` and a simple "Welcome to ProScapes" page.

## Recommendations

- If `public/` is your web server document root, customize `public/index.php` as your landing page or front controller.
- If the real docroot differs (e.g., `public_html/`), update `public/q.php` to reflect the correct path, or remove `q.php` if it is no longer needed.
- If using Apache or Nginx, add the appropriate virtual host config or `.htaccess` rewrite rules to route to your actual entry point(s).

## Next Steps

- Decide the intended document root and entry point.
- Optionally, add routing (Apache `.htaccess` or Nginx rules) if you want a single front controller.
