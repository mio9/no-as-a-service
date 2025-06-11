// Declare a namespace for environment variables

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string;
            TRUST_PROXY: 'true' | 'false';
            OLLAMA_URL: string;
            OLLAMA_MODEL: string;
        }
    }

}

// Export the namespace to make it available for TypeScript type checking
export { };