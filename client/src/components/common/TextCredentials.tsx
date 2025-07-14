import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const TestCredentials = () => {
  const [copiedField, setCopiedField] = useState('');

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(''), 2000);
  };

  return (
    <div className="bg-light-background-color border border-blue-200 rounded-lg p-4 shadow-sm mb-4">
      <p className="text-xs text-primary mb-4 leading-relaxed text-center">
        Use these test credentials to explore all features without creating an
        account
      </p>

      <div className="space-y-3">
        {/* Email Field */}
        <div className="bg-white rounded-md border border-blue-200 p-3">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Email
              </label>
              <code className="text-sm text-gray-800 bg-gray-50 px-2 py-1 rounded font-mono">
                testdev@gmail.com
              </code>
            </div>
            <button
              onClick={() => copyToClipboard('testdev@gmail.com', 'email')}
              className="ml-2 p-1.5 text-primary hover:text-primary-500 hover:bg-navy-50 rounded transition-colors"
              title="Copy email"
            >
              {copiedField === 'email' ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Password Field */}
        <div className="bg-white rounded-md border border-blue-200 p-3">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Password
              </label>
              <code className="text-sm text-gray-800 bg-gray-50 px-2 py-1 rounded font-mono">
                Dev2244?
              </code>
            </div>
            <button
              onClick={() => copyToClipboard('Dev2244?', 'password')}
              className="ml-2 p-1.5 text-primary hover:text-primary-500 hover:bg-navy-50 rounded transition-colors"
              title="Copy password"
            >
              {copiedField === 'password' ? (
                <Check className="h-4 w-4 text-green-new-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestCredentials;
