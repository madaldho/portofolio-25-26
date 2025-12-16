import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { extractPlainText, calculateReadingTime, getExcerpt, renderRichText } from '../richText';
import type { Document, Node } from '@contentful/rich-text-types';
import { BLOCKS } from '@contentful/rich-text-types';

describe('Rich Text Utilities', () => {
  /**
   * **Feature: portfolio-redesign, Property 15: Rich Text Rendering Consistency**
   * 
   * For any Contentful rich text document, the rich text renderer SHALL produce 
   * valid HTML output that preserves the document structure, and embedded assets 
   * SHALL be properly resolved with valid URLs.
   * 
   * **Validates: Requirements 11.3, 12.5, 13.4**
   */
  it('Property 15: renders rich text documents to valid HTML', () => {
    fc.assert(fc.property(
      fc.record({
        nodeType: fc.constant('document'),
        data: fc.record({}),
        content: fc.array(
          fc.record({
            nodeType: fc.constantFrom('paragraph', 'heading-1', 'heading-2'),
            data: fc.record({}),
            content: fc.array(
              fc.record({
                nodeType: fc.constant('text'),
                value: fc.string({ minLength: 1, maxLength: 100 }),
                marks: fc.array(fc.record({})),
                data: fc.record({}),
              })
            ),
          }),
          { minLength: 1, maxLength: 5 }
        ),
      }),
      (document) => {
        const html = renderRichText(document as Document);
        
        // Should return valid HTML string
        expect(typeof html).toBe('string');
        expect(html.length).toBeGreaterThan(0);
        
        // Should contain proper HTML tags based on content
        if (document.content.some((node: any) => node.nodeType === 'paragraph')) {
          expect(html).toContain('<p');
        }
        if (document.content.some((node: any) => node.nodeType === 'heading-1')) {
          expect(html).toContain('<h1');
        }
        if (document.content.some((node: any) => node.nodeType === 'heading-2')) {
          expect(html).toContain('<h2');
        }
        
        // Should not contain script tags (security)
        expect(html).not.toContain('<script');
      }
    ), { numRuns: 100 });
  });

  it('Property 15: handles empty documents gracefully', () => {
    fc.assert(fc.property(
      fc.oneof(
        fc.constant(null),
        fc.constant(undefined),
        fc.record({
          nodeType: fc.constant('document'),
          data: fc.record({}),
          content: fc.constant([]),
        }),
      ),
      (document) => {
        const html = renderRichText(document as Document);
        expect(typeof html).toBe('string');
      }
    ), { numRuns: 100 });
  });

  it('extracts plain text from rich text documents', () => {
    const document: Document = {
      nodeType: 'document',
      data: {},
      content: [
        {
          nodeType: 'paragraph',
          data: {},
          content: [
            {
              nodeType: 'text',
              value: 'Hello world',
              marks: [],
              data: {},
            },
          ],
        },
        {
          nodeType: 'paragraph',
          data: {},
          content: [
            {
              nodeType: 'text',
              value: 'This is a test',
              marks: [],
              data: {},
            },
          ],
        },
      ],
    };

    const plainText = extractPlainText(document);
    expect(plainText).toBe('Hello world This is a test');
  });

  it('calculates reading time correctly', () => {
    fc.assert(fc.property(
      fc.array(fc.string({ minLength: 1, maxLength: 50 }), { minLength: 1, maxLength: 20 }),
      (words) => {
        const document: Document = {
          nodeType: 'document',
          data: {},
          content: [
            {
              nodeType: 'paragraph',
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value: words.join(' '),
                  marks: [],
                  data: {},
                },
              ],
            },
          ],
        };

        const readingTime = calculateReadingTime(document);
        
        // Should return a positive number
        expect(readingTime).toBeGreaterThan(0);
        
        // Should be reasonable (1-20 minutes for test content)
        expect(readingTime).toBeLessThanOrEqual(20);
        
        // Should scale with content length
        const wordCount = words.length;
        const expectedTime = Math.ceil(wordCount / 200); // 200 words per minute
        expect(readingTime).toBe(expectedTime);
      }
    ), { numRuns: 100 });
  });

  it('generates excerpts with proper length limits', () => {
    fc.assert(fc.property(
      fc.string({ minLength: 1, maxLength: 500 }),
      fc.integer({ min: 10, max: 200 }),
      (text, maxLength) => {
        const document: Document = {
          nodeType: 'document',
          data: {},
          content: [
            {
              nodeType: 'paragraph',
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value: text,
                  marks: [],
                  data: {},
                },
              ],
            },
          ],
        };

        const excerpt = getExcerpt(document, maxLength);
        
        // Should not exceed max length (plus ellipsis)
        expect(excerpt.length).toBeLessThanOrEqual(maxLength + 3);
        
        // Should end with ellipsis if truncated
        if (text.length > maxLength) {
          expect(excerpt).toEndWith('...');
        }
        
        // Should not break words if possible
        if (text.length > maxLength && excerpt.endsWith('...')) {
          const withoutEllipsis = excerpt.slice(0, -3);
          const lastChar = withoutEllipsis[withoutEllipsis.length - 1];
          // Should not end with a partial word (unless no spaces found)
          if (withoutEllipsis.includes(' ')) {
            expect(lastChar).not.toMatch(/[a-zA-Z]/);
          }
        }
      }
    ), { numRuns: 100 });
  });

  it('handles complex rich text structures', () => {
    const complexDocument: Document = {
      nodeType: 'document',
      data: {},
      content: [
        {
          nodeType: 'heading-1',
          data: {},
          content: [
            {
              nodeType: 'text',
              value: 'Main Title',
              marks: [],
              data: {},
            },
          ],
        },
        {
          nodeType: 'paragraph',
          data: {},
          content: [
            {
              nodeType: 'text',
              value: 'This is a paragraph with ',
              marks: [],
              data: {},
            },
            {
              nodeType: 'text',
              value: 'bold text',
              marks: [{ type: 'bold' }],
              data: {},
            },
            {
              nodeType: 'text',
              value: ' and normal text.',
              marks: [],
              data: {},
            },
          ],
        },
        {
          nodeType: 'unordered-list',
          data: {},
          content: [
            {
              nodeType: 'list-item',
              data: {},
              content: [
                {
                  nodeType: 'paragraph',
                  data: {},
                  content: [
                    {
                      nodeType: 'text',
                      value: 'List item 1',
                      marks: [],
                      data: {},
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };

    const html = renderRichText(complexDocument);
    expect(html).toContain('<h1');
    expect(html).toContain('<p');
    expect(html).toContain('<ul');
    expect(html).toContain('<li');
    expect(html).toContain('<strong');

    const plainText = extractPlainText(complexDocument);
    expect(plainText).toContain('Main Title');
    expect(plainText).toContain('bold text');
    expect(plainText).toContain('List item 1');
  });
});