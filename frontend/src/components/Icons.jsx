export const Phone = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
       strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
  </svg>
)

export const Bag = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
       strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18M16 10a4 4 0 0 1-8 0" />
  </svg>
)

export const Table = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
       strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M3 8h18M5 8v12M19 8v12M8 3h8l2 5H6Z" />
  </svg>
)

export const Search = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"
       strokeLinecap="round" {...p} width="17" height="17">
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.2-3.2" />
  </svg>
)

export const Whatsapp = (p) => (
  <svg viewBox="0 0 24 24" fill="#191512" {...p}>
    <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm5.6 14.1c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1-.4-.1-1-.3-1.8-.6-3.1-1.3-5.1-4.4-5.3-4.6-.1-.2-1.2-1.6-1.2-3.1 0-1.4.8-2.1 1-2.4.3-.3.6-.4.8-.4h.6c.2 0 .5-.1.7.5l.9 2.2c.1.2.1.4 0 .6l-.4.5-.3.3c-.1.1-.3.3-.1.6.1.3.7 1.2 1.5 1.9 1 .9 1.9 1.2 2.2 1.3.3.1.4.1.6-.1l.9-1c.2-.2.4-.2.6-.1l2 1c.3.1.5.2.5.3.1.2.1.7-.1 1.3Z" />
  </svg>
)

export const Chilli = ({ on }) => (
  <svg viewBox="0 0 24 24" fill={on ? '#e23a2e' : 'none'} stroke={on ? '#e23a2e' : '#c9bfb6'}
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 4c0-1 1-2 2-2M14 4c3 0 5 2.5 5 6 0 5-4.5 10-9 10-3 0-5-1.8-5-4 0-1.6 1.2-2.5 2.5-2.5S10 14.4 10 16" />
  </svg>
)
