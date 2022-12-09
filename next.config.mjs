/**
	 * @type {import('next').NextConfig}
**/
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const nextConfig = {
	reactStrictMode: true,
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
	compiler: {
		// Enables the styled-components SWC transform
		styledComponents: true
	}
}

export default nextConfig;
