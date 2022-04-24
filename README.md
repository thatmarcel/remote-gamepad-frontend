# Remote Gamepad
**Website enabling the use of a smartphone as a gamepad (Frontend)**

## Dependencies
- This project is built with [Next.js](https://nextjs.org/) which is based on [React](https://reactjs.org) and also has things like server-side page generation
- [Tailwind](https://tailwindcss.com/) is used to make styling easy and to not have to write CSS
- [Chakra UI](https://chakra-ui.com/) provides components such as buttons
- [React Joystick Component](https://github.com/elmarti/react-joystick-component) provides the joystick component
- [Tailwind Plugin for correct full height on iOS](https://github.com/RVxLab/tailwind-plugin-ios-full-height) makes sizing a component to full height on iOS safari easily possible via Tailwind (the iOS viewport is bigger than it looks because of the bottom and top bar so normal full-height doesn't work correctly)
- [Sentry][https://sentry.io] for error reporting

## Developing
- Run `npm install` to install the required dependencies
- Run `npm run dev` to start a local web server to test the website

Hosted on [Vercel](https://vercel.com/)