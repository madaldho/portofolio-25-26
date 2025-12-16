import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { isValidEmail, validateContactForm, type ContactFormData } from './validation';

/**
 * **Feature: portfolio-redesign, Property 6: Contact Form Validation Round Trip**
 * **Validates: Requirements 6.2, 6.3**
 * 
 * For any valid contact form data (name: non-empty string, email: valid email format,
 * message: non-empty string with minimum 10 characters), the validation function SHALL
 * return success. For any invalid contact form data, the validation function SHALL return
 * specific error messages indicating which fields are invalid.
 */
describe('Contact Form Validation Round Trip', () => {
  // Generator for valid form data
  const validFormDataArb = fc.record({
    name: fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0),
    email: fc.emailAddress(),
    message: fc.string({ minLength: 10, maxLength: 1000 }).filter(s => s.trim().length >= 10),
  });

  it('Property 6: Valid form data passes validation', () => {
    fc.assert(
      fc.property(validFormDataArb, (data: ContactFormData) => {
        const result = validateContactForm(data);
        expect(result.valid).toBe(true);
        expect(Object.keys(result.errors)).toHaveLength(0);
      }),
      { numRuns: 100 }
    );
  });

  it('Property 6: Empty name fails validation with specific error', () => {
    fc.assert(
      fc.property(
        fc.emailAddress(),
        fc.string({ minLength: 10 }),
        (email, message) => {
          const result = validateContactForm({ name: '', email, message });
          expect(result.valid).toBe(false);
          expect(result.errors.name).toBeDefined();
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 6: Invalid email fails validation with specific error', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
        fc.string({ minLength: 10 }),
        (name, message) => {
          const result = validateContactForm({ name, email: 'invalid-email', message });
          expect(result.valid).toBe(false);
          expect(result.errors.email).toBeDefined();
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 6: Short message fails validation with specific error', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
        fc.emailAddress(),
        (name, email) => {
          const result = validateContactForm({ name, email, message: 'short' });
          expect(result.valid).toBe(false);
          expect(result.errors.message).toBeDefined();
        }
      ),
      { numRuns: 100 }
    );
  });
});

/**
 * **Feature: portfolio-redesign, Property 7: Email Validation Correctness**
 * **Validates: Requirements 6.3**
 * 
 * For any string input to the email validator, the validator SHALL return true only for
 * strings matching the email format pattern (contains @ symbol, has domain part, no spaces),
 * and SHALL return false for all other strings.
 */
describe('Email Validation Correctness', () => {
  it('Property 7: Valid emails pass validation', () => {
    fc.assert(
      fc.property(fc.emailAddress(), (email) => {
        expect(isValidEmail(email)).toBe(true);
      }),
      { numRuns: 100 }
    );
  });

  it('Property 7: Strings without @ fail validation', () => {
    fc.assert(
      fc.property(
        fc.string().filter(s => !s.includes('@')),
        (notEmail) => {
          expect(isValidEmail(notEmail)).toBe(false);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 7: Strings with internal spaces fail validation', () => {
    const emailsWithInternalSpaces = [
      'test @example.com',
      'test@ example.com',
      'test@example .com',
      'te st@example.com',
    ];
    
    emailsWithInternalSpaces.forEach(email => {
      expect(isValidEmail(email)).toBe(false);
    });
  });

  it('Property 7: Empty and null-like values fail validation', () => {
    expect(isValidEmail('')).toBe(false);
    expect(isValidEmail('   ')).toBe(false);
    expect(isValidEmail(null as unknown as string)).toBe(false);
    expect(isValidEmail(undefined as unknown as string)).toBe(false);
  });

  it('Property 7: Common valid email formats pass', () => {
    const validEmails = [
      'test@example.com',
      'user.name@domain.org',
      'user+tag@example.co.uk',
      'firstname.lastname@company.com',
    ];
    
    validEmails.forEach(email => {
      expect(isValidEmail(email)).toBe(true);
    });
  });

  it('Property 7: Common invalid email formats fail', () => {
    const invalidEmails = [
      'plaintext',
      '@nodomain.com',
      'no@domain',
      'double@@at.com',
    ];
    
    invalidEmails.forEach(email => {
      expect(isValidEmail(email)).toBe(false);
    });
  });
});
