# TON Address Converter

TON Address Converter is a web application that allows users to convert TON blockchain addresses between different formats. It provides an easy-to-use interface for converting addresses and copying them to the clipboard.

## Features

- Convert TON addresses to various formats:
  - HEX
  - Mainnet (Bounceable and Non-bounceable)
  - Testnet (Bounceable and Non-bounceable)
- Real-time address conversion as you type
- Copy converted addresses to clipboard with a single click
- Dark mode support
- Responsive design for desktop and mobile devices

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- @ton/core library for TON address parsing and conversion
- Lucide React for icons
- shadcn/ui components

## Installation

1. Clone the repository:
   git clone https://github.com/yourusername/ton-address-converter.git
   Copy
2. Navigate to the project directory:
   cd ton-address-converter
   Copy
3. Install dependencies:
   npm install
   Copy
4. Start the development server:
   npm run dev
   Copy
5. Open your browser and visit `http://localhost:3000` to view the app.

## Usage

1. Enter a TON address in the input field at the top of the page.
2. The app will automatically convert the address to different formats as you type.
3. If the address is valid, you'll see the converted formats displayed below the input field.
4. Click the copy button next to any converted address to copy it to your clipboard.
5. Use the theme toggle button in the top-right corner to switch between light and dark modes.

## Error Handling

- If you enter an invalid address, the app will display an error message.
- The app will also show an error if the input field is left empty.

## Components

### AddressConverter

The main component of the application. It handles the address input, conversion, and display of results.

### AddressField

A reusable component for displaying each converted address format with a copy button.

## Styling

The app uses Tailwind CSS for styling, providing a clean and responsive design. The dark mode is implemented using Tailwind's dark mode feature.

## TON Address Formats

The app supports the following TON address formats:

1. **HEX**: The raw hexadecimal representation of the address.
2. **Mainnet Bounceable**: The bounceable address format for the main TON network.
3. **Mainnet Non-bounceable**: The non-bounceable address format for the main TON network.
4. **Testnet Bounceable**: The bounceable address format for the TON test network.
5. **Testnet Non-bounceable**: The non-bounceable address format for the TON test network.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
