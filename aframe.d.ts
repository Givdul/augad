// aframe.d.ts
declare namespace JSX {
    interface IntrinsicElements {
        'a-scene': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { className?: string; embedded?: boolean; arjs?: boolean };
        'a-box': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { position?: string; rotation?: string; color?: string; material?: string };
        'a-sphere': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { position?: string; radius?: string; color?: string };
        'a-cylinder': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { position?: string; radius?: string; height?: string; color?: string };
        'a-plane': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { position?: string; rotation?: string; width?: string; height?: string; color?: string };
        'a-sky': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { color?: string };
        'a-marker-camera': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { preset?: string };
        'a-marker': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { preset?: string };
    }
}