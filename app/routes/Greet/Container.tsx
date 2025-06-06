import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { sendName } from "~/services/backend";

// Define the schema for form validation
const formSchema = z.object({
  name: z.string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name must be less than 50 characters" })
});

// Infer the type from the schema
type FormValues = z.infer<typeof formSchema>;

interface Props {}

export function GreetContainer(props: Props) {
    const [greeting, setGreeting] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    
    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ''
        }
    });

    const onSubmit = (data: FormValues) => {
        setIsLoading(true);
        setError(false);
        
        sendName(data.name)
            .then((response) => {
                setGreeting(response);
            })
            .catch(() => {
                setError(true);
                console.warn('Error sending greet!');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <main className="flex flex-col items-center justify-center pt-16 pb-4">
            <h1 className="mb-6 text-xl font-bold">Greet Form</h1>
            
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
                <div className="mb-4">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium">
                        Your Name
                    </label>
                    <input
                        id="name"
                        {...register('name')}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your name"
                    />
                    {errors.name && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.name.message}
                        </p>
                    )}
                </div>
                
                <button 
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
                    disabled={isLoading}
                >
                    {isLoading ? 'Sending...' : 'Submit'}
                </button>
            </form>
            
            {/* Display area for greeting or loading message */}
            <div className="mt-6 p-4 w-full max-w-md bg-gray-50 rounded-md">
                {isLoading && (
                    <p className="text-center text-gray-600">Loading greeting...</p>
                )}
                
                {!isLoading && greeting && (
                    <p className="text-center text-green-600 font-medium">{greeting}</p>
                )}
                
                {!isLoading && greeting === null && !error && (
                    <p className="text-center text-gray-500">Submit your name to get a greeting</p>
                )}
                
                {!isLoading && error && (
                    <p className="text-center text-red-600">Failed to get greeting. Please try again.</p>
                )}
            </div>
        </main>
    );
}