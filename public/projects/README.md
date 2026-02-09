# Project Images

Place your project images in this directory.

## Image Guidelines

- **Format:** JPG, PNG, or WebP
- **Recommended size:** 1200x800px (3:2 aspect ratio)
- **Naming convention:** `project1.jpg`, `project2.jpg`, etc.

## Usage

Update the image paths in `src/data/index.ts`:

```typescript
export const projects = [
  {
    ...
    image: '/projects/project1.jpg', // Path relative to public directory
    ...
  },
]
```

## Placeholder Images

For now, the project uses CSS gradient placeholders. Add your real project images here and update the paths in the data file.
