import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters.',
  }),
  participantCount: z.number().min(1, {
    message: 'You need at least 1 participant.',
  }),
  studyType: z.enum(['interview', 'survey', 'usability']),
});

const StudyCreator = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      participantCount: 1,
      studyType: 'interview',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(values);
    setIsSubmitting(false);
    toast({
      title: 'Study Created',
      description: 'Your user research study has been successfully created.',
    });
    form.reset();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Create User Research Study</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Study Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter study title" {...field} />
                </FormControl>
                <FormDescription>
                  Give your study a clear and concise title.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Study Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe the purpose and goals of your study"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Provide a detailed description of your research study.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="participantCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Participants</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  Specify the number of participants for your study.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="studyType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Study Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a study type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="interview">Interview</SelectItem>
                    <SelectItem value="survey">Survey</SelectItem>
                    <SelectItem value="usability">Usability Test</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Choose the type of study you want to conduct.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Study'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default StudyCreator;