import React, { useState } from 'react';
import { Sun, Moon, Copy, Check, Send } from 'lucide-react';
import { Address } from '@ton/core';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';

interface AddressFormats {
  hex: string;
  mainnet: {
    bounceable: string;
    nonBounceable: string;
  };
  testnet: {
    bounceable: string;
    nonBounceable: string;
  };
}

export const AddressConverter: React.FC = () => {
  const [address, setAddress] = useState<string>('');
  const [addressFormats, setAddressFormats] = useState<AddressFormats | null>(
    null
  );
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();

  const convertAddress = (inputAddress: string) => {
    try {
      const addr = Address.parse(inputAddress);
      const hexPart = addr.toRawString();

      setAddressFormats({
        hex: hexPart,
        mainnet: {
          bounceable: addr.toString({ urlSafe: true, bounceable: true }),
          nonBounceable: addr.toString({ urlSafe: true, bounceable: false }),
        },
        testnet: {
          bounceable: addr.toString({
            urlSafe: true,
            bounceable: true,
            testOnly: true,
          }),
          nonBounceable: addr.toString({
            urlSafe: true,
            bounceable: false,
            testOnly: true,
          }),
        },
      });
      setError(null);
    } catch (error) {
      console.error('Error converting address:', error);
      setAddressFormats(null);
      setError('Invalid address format');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setAddress(inputValue);
    if (inputValue.trim() === '') {
      setError('Please enter an address');
      setAddressFormats(null);
    } else {
      convertAddress(inputValue);
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const AddressField: React.FC<{
    label: string;
    value: string;
    field: string;
  }> = ({ label, value, field }) => (
    <div className='mb-4'>
      <label className='block text-sm font-medium mb-1'>{label}</label>
      <div className='flex'>
        <input
          type='text'
          readOnly
          value={value}
          className='flex-grow px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <button
          onClick={() => copyToClipboard(value, field)}
          className='px-3 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
        >
          {copiedField === field ? <Check size={18} /> : <Copy size={18} />}
        </button>
      </div>
    </div>
  );

  return (
    <div className='min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-8 transition-colors duration-200'>
      <div className='container mx-auto px-4'>
        <div className='max-w-3xl mx-auto'>
          <div className='flex justify-between items-center mb-8'>
            <h1 className='text-3xl font-bold'>TON Address Converter</h1>
            <Button
              variant='outline'
              size='icon'
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className='mr-2 p-0'
            >
              {theme === 'dark' ? (
                <Sun className='h-[1.2rem] w-[1.2rem]' />
              ) : (
                <Moon className='h-[1.2rem] w-[1.2rem]' />
              )}
              <span className='sr-only'>Toggle theme</span>
            </Button>
          </div>
          <div className='mb-8'>
            <div className='flex mb-4'>
              <input
                autoComplete='off'
                type='text'
                value={address}
                onChange={handleInputChange}
                placeholder='Enter TON address'
                className={`flex-grow px-4 py-2 rounded-l-md border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
                  theme === 'light'
                    ? 'bg-white border-gray-300'
                    : 'bg-gray-800 border-gray-700'
                }`}
              />
              <button
                onClick={() =>
                  navigator.clipboard.readText().then((text) => {
                    setAddress(text);
                    convertAddress(text);
                  })
                }
                className='px-3 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
              >
                Paste
              </button>
            </div>

            {error && <p className='mt-2 text-red-500 text-sm'>{error}</p>}
          </div>
          {addressFormats && (
            <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200'>
              <AddressField
                label='HEX:'
                value={addressFormats.hex}
                field='hex'
              />
              <h2 className='text-xl font-semibold mb-4'>Mainnet:</h2>
              <AddressField
                label='Bounceable:'
                value={addressFormats.mainnet.bounceable}
                field='mainnetBounceable'
              />
              <AddressField
                label='Non-bounceable:'
                value={addressFormats.mainnet.nonBounceable}
                field='mainnetNonBounceable'
              />
              <h2 className='text-xl font-semibold mb-4 mt-6'>Testnet:</h2>
              <AddressField
                label='Bounceable:'
                value={addressFormats.testnet.bounceable}
                field='testnetBounceable'
              />
              <AddressField
                label='Non-bounceable:'
                value={addressFormats.testnet.nonBounceable}
                field='testnetNonBounceable'
              />
            </div>
          )}
        </div>
      </div>

      <CardFooter className='flex justify-center pt-6'>
        <a
          href='https://t.me/arveer'
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center text-sm text-muted-foreground hover:text-primary transition-colors'
        >
          <Send className='h-4 w-4 mr-2' />
          Contact me on Telegram
        </a>
      </CardFooter>
    </div>
  );
};
