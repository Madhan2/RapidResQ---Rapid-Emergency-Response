'use server';
/**
 * @fileOverview Provides an AI-generated concise summary of an emergency alert for responders.
 *
 * - emergencyBriefingSummary - A function that generates a summary of an emergency.
 * - EmergencyBriefingSummaryInput - The input type for the emergencyBriefingSummary function.
 * - EmergencyBriefingSummaryOutput - The return type for the emergencyBriefingSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EmergencyBriefingSummaryInputSchema = z.object({
  emergencyType: z
    .enum(['accident', 'cardiac', 'fire', 'other'])
    .describe('The type of emergency reported.'),
  locationDescription: z
    .string()
    .describe('A text description of the emergency location.'),
  severity: z.enum(['low', 'medium', 'high']).describe('The severity level of the emergency.'),
  timestamp: z.string().describe('The timestamp when the emergency was reported.'),
  userId: z.string().optional().describe('The ID of the user who triggered the emergency.'),
  potentialHazards: z
    .string()
    .optional()
    .describe('Any known potential hazards at the emergency site.'),
});
export type EmergencyBriefingSummaryInput = z.infer<
  typeof EmergencyBriefingSummaryInputSchema
>;

const EmergencyBriefingSummaryOutputSchema = z.object({
  summary: z.string().describe('A concise, AI-generated summary of the emergency alert.'),
});
export type EmergencyBriefingSummaryOutput = z.infer<
  typeof EmergencyBriefingSummaryOutputSchema
>;

const emergencyBriefingSummaryPrompt = ai.definePrompt({
  name: 'emergencyBriefingSummaryPrompt',
  input: {schema: EmergencyBriefingSummaryInputSchema},
  output: {schema: EmergencyBriefingSummaryOutputSchema},
  prompt: `You are an AI assistant for RapidResQ emergency responders. Your task is to provide a concise and critical summary of an emergency alert based on the provided details. Focus on emergency type, location, severity, and any potential hazards. The summary should be easy to read and provide actionable information.

Emergency Type: {{{emergencyType}}}
Location: {{{locationDescription}}}
Severity: {{{severity}}}
Timestamp: {{{timestamp}}}
{{#if potentialHazards}}Potential Hazards: {{{potentialHazards}}}{{/if}}

Provide the summary in a paragraph.`,
});

const emergencyBriefingSummaryFlow = ai.defineFlow(
  {
    name: 'emergencyBriefingSummaryFlow',
    inputSchema: EmergencyBriefingSummaryInputSchema,
    outputSchema: EmergencyBriefingSummaryOutputSchema,
  },
  async input => {
    const {output} = await emergencyBriefingSummaryPrompt(input);
    return output!;
  }
);

export async function emergencyBriefingSummary(
  input: EmergencyBriefingSummaryInput
): Promise<EmergencyBriefingSummaryOutput> {
  return emergencyBriefingSummaryFlow(input);
}
