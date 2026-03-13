import Link from "next/link";

interface NavigationLink {
    slug: string;
    title: string;
}

interface NavigationProps {
    navigation: {
        previous: NavigationLink;
        next: NavigationLink;
    };
}

export default function Navigation({ navigation }: NavigationProps) {
    return (
        <div className="border-t border-[#e5e6ea] pt-8 min-h-[104px]">
            <div className="flex flex-col md:flex-row justify-between items-start w-full gap-4">
                {navigation.previous && (
                    <div className="flex flex-col gap-2 items-start flex-1">
                        <Link href={`/blog/${navigation.previous.slug}`}><div className="cursor-pointer flex items-center gap-3 px-4 py-2 border border-[#05091c] rounded-sm hover:bg-[#05091c] hover:text-white transition-colors group">
                            <svg className="w-4 h-4 rotate-90 group-hover:text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            <span className="text-[#05091c] text-base font-normal leading-6 tracking-[1px] group-hover:text-white">Previous</span>
                        </div> </Link>
                        <span className="text-[#262d4d] text-sm leading-5 tracking-[1px] text-left">{navigation.previous.title}</span>
                    </div>
                )}
                {!navigation.previous && <div className="flex-1" />}
                {navigation.next && (
                    <div className="flex flex-col gap-2 items-end flex-1">
                        <Link href={`/blog/${navigation.next.slug}`}><div className="cursor-pointer flex items-center gap-3 px-4 py-2 border border-[#05091c] rounded-sm hover:bg-[#05091c] hover:text-white transition-colors group">
                            <span className="text-[#05091c] text-base font-normal leading-6 tracking-[1px] group-hover:text-white">Next</span>
                            <svg className="w-4 h-4 -rotate-90 group-hover:text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </div></Link>
                        <span className="text-[#262d4d] text-sm leading-5 tracking-[1px] text-right">{navigation.next.title}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
