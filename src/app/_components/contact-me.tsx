'use client';

import { Container } from '@/shared/ui/container';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/shared/ui/form';
import { Field, FieldSet, FieldLabel, FieldError, FieldGroup } from '@/shared/ui/field';

import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import { Button } from '@/shared/ui/button';

export function ContactMe() {
  return (
    <section className='py-24 bg-secondary'>
      <Container className='space-y-6'>
        <h2 className='text-2xl font-bold text-center'>Contact</h2>
        <ContactForm />
      </Container>
    </section>
  );
}

const formDefaultValues = {
  name: '',
  email: '',
  message: '',
};

const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  message: z.string().min(1, { message: 'Message is required' }),
});

function ContactForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formDefaultValues,
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel>Name</FieldLabel>
              <Input {...form.register('name')} />
              <FieldError>{form.formState.errors.name?.message}</FieldError>
            </Field>
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input {...form.register('email')} />
              <FieldError>{form.formState.errors.email?.message}</FieldError>
            </Field>
            <Field>
              <FieldLabel>Message</FieldLabel>
              <Textarea {...form.register('message')} />
              <FieldError>{form.formState.errors.message?.message}</FieldError>
            </Field>
          </FieldGroup>
          <Button type='submit'>Submit</Button>
        </FieldSet>
      </form>
    </Form>
  );
}
