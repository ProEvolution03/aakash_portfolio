export const Github = ({ size = 24, fill = "none", stroke = "currentColor", ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.34 6-1.5 6-6.76a5.2 5.2 0 0 0-1.5-3.78 4.8 4.8 0 0 0-.15-3.72s-1.2-.38-3.9 1.44a13 13 0 0 0-7 0c-2.7-1.82-3.9-1.44-3.9-1.44a4.8 4.8 0 0 0-.15 3.72 5.2 5.2 0 0 0-1.5 3.78c0 5.26 3 6.42 6 6.76a4.8 4.8 0 0 0-1 3.24v4"></path>
  </svg>
);

export const Twitter = ({ size = 24, fill = "currentColor", stroke = "none", ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
  </svg>
);

export const Instagram = ({ size = 24, fill = "none", stroke = "currentColor", ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);
