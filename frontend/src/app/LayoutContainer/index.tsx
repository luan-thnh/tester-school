"use client";
import Header from "@/components/layouts/Header";
import Footer from "@/components/atoms/Footer";
import Navigation from "@/components/molecules/Navigation";
import {usePathname} from "next/navigation";
import {Suspense, useEffect, useState} from "react";
import {NavigationType} from "@/interfaces";
import {UserProvider} from "@/context/UserContext";
interface LayoutContainerProps {
    isNav?: boolean;
    isHeader?: boolean;
    isFooter?: boolean;
    footerChildren?: React.ReactNode;
    children: React.ReactNode;
}

export default function LayoutContainer({
    isNav = true,
    isHeader = true,
    isFooter = true,
    footerChildren,
    children
}: LayoutContainerProps) {
    const pathCurrentPage = usePathname();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 200);
    }, []);

    if (isLoading) return null;

    return (
        <div className="flex">
            {isNav && (
                <Navigation
                    type={NavigationType.CLIENT}
                    routePath={pathCurrentPage || ""}
                />
            )}
            <div className="flex-1 max-h-[100vh] overflow-scroll">
                {isHeader && <Header />}
                <div className="">{children}</div>
                {isFooter && <Footer />}
            </div>
        </div>
    );
}
