const environment = process.env.environment || 'dev';

export const apiConfig = {
    url : environment === 'dev' ? 'http://localhost:8080' : 'https://terra-scribe.vercel.app'
}
