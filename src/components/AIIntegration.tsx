import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const AIIntegration = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Simulate API call to AI service
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setResponse(
        `AI-generated response for: "${prompt}"\n\nThis is a placeholder response. In a real application, this would be the output from an AI model like GPT-3 or GPT-4.`
      );
      toast({
        title: 'AI Response Generated',
        description: 'The AI has processed your prompt successfully.',
      });
    } catch (error) {
      console.error('Error generating AI response:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate AI response. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">AI Integration</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="prompt" className="block text-sm font-medium mb-1">
            Enter your prompt
          </label>
          <Input
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Generate 5 interview questions for a UX research study"
            className="w-full"
          />
        </div>
        <Button type="submit" disabled={isLoading || !prompt}>
          {isLoading ? 'Generating...' : 'Generate Response'}
        </Button>
      </form>
      {response && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">AI Response:</h3>
          <Textarea
            value={response}
            readOnly
            className="w-full h-48"
          />
        </div>
      )}
    </div>
  );
};

export default AIIntegration;