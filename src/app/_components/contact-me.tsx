'use client';

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, FieldLabel, FieldError, FieldGroup } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import { LoadingButton } from '@/shared/ui/loading-button';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/shared/ui/dialog';
import { Container } from '@/shared/ui/container';

import { sendMail } from './send-mail';

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

export const formSchema = z.object({
  name: z.string().min(1, { message: '이름을 입력해주세요.' }),
  email: z.string().email({ message: '올바른 이메일 주소를 입력해주세요.' }),
  message: z.string().min(1, { message: '내용을 입력해주세요.' }),
});

function ContactForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: formDefaultValues,
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const result = await sendMail(data);

    if (!result.success) {
      toast.error(result.error);
      return;
    }

    form.reset();
  };

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            control={form.control}
            name='name'
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name='email'
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name='message'
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Message</FieldLabel>
                <Textarea
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          <LoadingButton
            type='submit'
            isLoading={form.formState.isSubmitting}
          >
            Submit
          </LoadingButton>
        </FieldGroup>
      </form>
      <SuccessDialog trigger={form.formState.isSubmitSuccessful} />
    </>
  );
}

function SuccessDialog({ trigger }: { trigger: boolean }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (trigger) {
      setOpen(true);
    }
  }, [trigger]);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>이메일이 전송되었습니다.</DialogTitle>
        </DialogHeader>
        <div>
          <p>이메일이 전송되었습니다.</p>
        </div>
        <DialogFooter>
          <DialogClose>확인</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
