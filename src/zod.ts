import {z} from 'zod';

const pattern = z.object({
    name: z.string(),
    age: z.number(),
    magics: z.string().array()
});

const result = pattern.parse({
    name: 'Ramon',
    age: 12,
    magics: ['lindeza', 'monamo', 'bebopaixonildo']
});

console.log(result);