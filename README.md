# awesome-nextjs

## Features

- [Mantine](https://github.com/mantinedev/mantine)
- [Reatom](https://github.com/artalar/reatom)
- [cookie-baker](https://github.com/BataevDaniil/cookie-baker)
- [next-intl](https://github.com/amannn/next-intl)

### Scripts

- `pnpm dev` — Starts the application in development mode at http://localhost:3000.
- `pnpm build` — Creates an optimized production build of your application.
- `pnpm start` — Starts the application in production mode.
- `pnpm types` — Validate code using TypeScript compiler.
- `pnpm format` — Runs Prettier for all files in the src directory.

### Path Mapping

TypeScript are pre-configured with custom path mappings. To import components or files, use the `@` prefix.

```tsx
import { Button } from '@/components/Button';

// To import images or other files from the public folder
import avatar from '@/public/avatar.png';
