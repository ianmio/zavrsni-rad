'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

import { sendMessage } from '@server/actions/contact';

import Spinner from '@components/Spinner';

import { getErrorMessage } from '@utils/error';
import { cn } from '@utils/tailwind';
import { useTranslations } from 'next-intl';

type FormData = {
  name: string;
  email: string;
  message: string;
};

type Errors = {
  name?: string;
  email?: string;
  message?: string;
};

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useTranslations('Form');

  const validate = (): Errors => {
    const errors: Errors = {};
    if (!formData.name.trim()) errors.name = t('name-error');
    if (!formData.email.trim()) {
      errors.email = t('email-error');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = t('email-invalid-error');
    }
    if (!formData.message.trim()) errors.message = t('message-error');
    return errors;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();

      const validationErrors = validate();
      if (Object.keys(validationErrors).length === 0) {
        setIsSubmitting(true);
        await sendMessage(formData);
        toast.success('Message successfully sent!');
        setFormData({ name: '', email: '', message: '' });
        setErrors({});
      } else {
        setErrors(validationErrors);
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="transition-colors duration-100 ease-in"
    >
      <div className="mb-6">
        <label
          htmlFor="name"
          className={cn('block text-base tracking-[-0.02em] mb-2 font-light', {
            'text-pink-500': errors.name,
          })}
        >
          {t('name')}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={cn(
            'p-4 bg-white-100 border-solid border-[1px] border-gray-100 font-light w-full h-[56px] focus:outline-none focus:border-gray-500',
            {
              'border-pink-500': errors.name,
            }
          )}
        />
        <p
          className={cn(
            'text-[12px] leading-[19px] font-light tracking-[-0.02em] text-pink-500 overflow-hidden transition-[height] duration-100 ease-in',
            {
              'h-[19px]': errors.name,
              'h-0': !errors.name,
            }
          )}
        >
          {errors.name}
        </p>
      </div>

      <div className="mb-6">
        <label
          htmlFor="email"
          className={cn('block text-base tracking-[-0.02em] mb-2 font-light', {
            'text-pink-500': errors.email,
          })}
        >
          {t('email')}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={cn(
            'p-4 bg-white-100 border-solid border-[1px] border-gray-100 font-light w-full h-[56px] focus:outline-none focus:border-gray-500',
            {
              'border-pink-500': errors.email,
            }
          )}
        />
        <p
          className={cn(
            'text-[12px] leading-[19px] font-light tracking-[-0.02em] text-pink-500 overflow-hidden transition-[height] duration-100 ease-in',
            {
              'h-[19px]': errors.email,
              'h-0': !errors.email,
            }
          )}
        >
          {errors.email}
        </p>
      </div>

      <div className="mb-6">
        <label
          htmlFor="message"
          className={cn('block text-base tracking-[-0.02em] mb-2 font-light', {
            'text-pink-500': errors.message,
          })}
        >
          {t('message')}
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className={cn(
            'p-4 bg-white-100 border-solid border-[1px] border-gray-100 font-light w-full h-[120px] resize-none focus:outline-none focus:border-gray-500',
            {
              'border-pink-500': errors.message,
            }
          )}
        ></textarea>
        <p
          className={cn(
            'text-[12px] leading-[19px] font-light tracking-[-0.02em] text-pink-500 overflow-hidden transition-[height] duration-100 ease-in mt-[-7px]',
            {
              'h-[19px]': errors.message,
              'h-0': !errors.message,
            }
          )}
        >
          {errors.message}
        </p>
      </div>

      <button
        disabled={isSubmitting}
        type="submit"
        className="w-full h-[50.67px] gap-2 bg-gray-500 text-white-100 text-[16px] font-light leading-[24px] tracking-[-0.02em] text-center hover:bg-gray-700 flex justify-center items-center"
      >
        {isSubmitting ? (
          <Spinner className="text-white-100" />
        ) : (
          t('send-message')
        )}
      </button>
    </form>
  );
};

export default ContactForm;
