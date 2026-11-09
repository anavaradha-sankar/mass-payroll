# MASS Payroll Solutions website

React + Vite + Tailwind CSS v4 rebuild of the "Option D" design.

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
```

- Copy (phone numbers, payslip, benefits) lives in `src/content.js`.
- Sections are components in `src/components/`.
- Design tokens and custom utilities are in `src/index.css`.

## Deploy

Every push to `main` builds the site and publishes it to its own S3 bucket via
`.github/workflows/deploy.yml`. The first run creates the bucket and turns on static website hosting.
The old site's bucket is not touched.

One-time setup in **Settings → Secrets and variables → Actions**:

| Type | Name | Value |
| --- | --- | --- |
| Secret | `AWS_ACCESS_KEY_ID` | Access key of an IAM user that can manage the bucket |
| Secret | `AWS_SECRET_ACCESS_KEY` | Its secret key |
| Variable (optional) | `S3_BUCKET` | Bucket name, default `mass-payroll-site` (must be globally unique) |
| Variable (optional) | `AWS_REGION` | Default `ap-south-1` |

The live address appears in the workflow run summary:
`http://<bucket>.s3-website.<region>.amazonaws.com`.

To deploy by hand instead:

```bash
npm run build
aws s3 sync dist/ s3://<your-bucket> --delete
```

`vite.config.js` sets `base: './'`, so the build works from any bucket or folder.
`public/brochure.pdf` is copied into the build as-is.

The contact form has no backend: it opens WhatsApp (+91 98409 92989) with the visitor's details filled in.
