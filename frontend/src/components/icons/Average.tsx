import React from 'react';

interface AverageIconProps extends React.SVGProps<SVGSVGElement> {
    size?: number;
}
export const AverageIcon: React.FC<AverageIconProps> = ({
    size = 24,
    ...props
}) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <path d="M8.5 10.5C8.5 9.96875 8.9375 9.5 9.5 9.5C10.0625 9.5 10.5 9.96875 10.5 10.5C10.5 11.0625 10.0625 11.5 9.5 11.5C8.9375 11.5 8.5 11.0625 8.5 10.5ZM15.5 10.5C15.5 11.0625 15.0625 11.5 14.5 11.5C13.9375 11.5 13.5 11.0625 13.5 10.5C13.5 9.96875 13.9375 9.5 14.5 9.5C15.0625 9.5 15.5 9.96875 15.5 10.5ZM14.25 14.25C14.6562 14.25 15 14.5938 15 15C15 15.4375 14.6562 15.75 14.25 15.75H9.75C9.3125 15.75 9 15.4375 9 15C9 14.5938 9.3125 14.25 9.75 14.25H14.25ZM20 12C20 16.4375 16.4062 20 12 20C7.5625 20 4 16.4375 4 12C4 7.59375 7.5625 4 12 4C16.4062 4 20 7.59375 20 12ZM12 18.5C15.5625 18.5 18.5 15.5938 18.5 12C18.5 8.4375 15.5625 5.5 12 5.5C8.40625 5.5 5.5 8.4375 5.5 12C5.5 15.5938 8.40625 18.5 12 18.5Z" fill="currentColor"/>
        </svg>
);
};

export default AverageIcon;
