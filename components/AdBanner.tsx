/**
 * AdBanner — Reklam Alanı Placeholder Bileşeni
 * 
 * İleride Google AdSense veya başka bir reklam ağı entegre edildiğinde
 * bu bileşenin içeriği gerçek reklam koduyla değiştirilecektir.
 */

type AdVariant = 'horizontal' | 'rectangle' | 'inline';

interface AdBannerProps {
  variant?: AdVariant;
  className?: string;
}

export default function AdBanner({ variant = 'horizontal', className = '' }: AdBannerProps) {
  const variantStyles: Record<AdVariant, string> = {
    horizontal: 'w-full max-w-[728px] h-[90px]',
    rectangle: 'w-full max-w-[300px] h-[250px]',
    inline: 'w-full max-w-[468px] h-[60px]',
  };

  return (
    <div 
      className={`mx-auto flex items-center justify-center ${variantStyles[variant]} ${className}`}
      data-ad-slot="placeholder"
      aria-hidden="true"
    >
      <div className="w-full h-full rounded-xl bg-gray-100 dark:bg-slate-800/40 border border-dashed border-gray-300 dark:border-slate-700 flex items-center justify-center opacity-60">
        <span className="text-xs text-gray-400 dark:text-slate-500 font-medium select-none">Reklam Alanı</span>
      </div>
    </div>
  );
}
