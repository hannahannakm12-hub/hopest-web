"use client";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen animated-gradient bg-[#0b0f19] text-white flex flex-col items-center px-6 py-16">

            {/* TOP BADGE */}
            <div className="mb-4 px-4 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-xs tracking-widest">
                🔒 PRIVACY POLICY
            </div>

            {/* TITLE */}
            <h1 className="text-4xl font-bold text-yellow-400 mb-10 text-center">
                Privacy Policy
            </h1>

            {/* CONTENT CARD */}
            <div className="w-full max-w-3xl bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 space-y-8">

                {/* INTRO */}
                <div>
                    <p className="text-gray-300 leading-relaxed">
                        Hopest app is a free application. By choosing to use our services,
                        you agree to the collection and use of information in accordance
                        with this policy. The personal information that we collect is used
                        for providing and improving the service. We will not use or share
                        your information except as described in this Privacy Policy.
                    </p>
                </div>

                {/* SECURITY */}
                <div>
                    <h2 className="text-xl font-semibold text-yellow-400 mb-2">
                        Security
                    </h2>
                    <p className="text-gray-300 leading-relaxed">
                        We value your trust in providing us your personal information, and
                        we strive to use commercially acceptable means of protecting it.
                    </p>
                </div>

                {/* CHILDREN */}
                <div>
                    <h2 className="text-xl font-semibold text-yellow-400 mb-2">
                        Children’s Privacy
                    </h2>
                    <p className="text-gray-300 leading-relaxed">
                        Our services do not address anyone under the age of 13. We do not
                        knowingly collect personally identifiable information from children
                        under 13. If we discover that a child has provided us with personal
                        information, we immediately delete it from our servers. If you are a
                        parent or guardian and aware that your child has provided personal
                        information, please contact us so we can take necessary action.
                    </p>
                </div>

                {/* NEW: POLICY CHANGES */}
                <div>
                    <h2 className="text-xl font-semibold text-yellow-400 mb-2">
                        Changes to This Privacy Policy
                    </h2>
                    <p className="text-gray-300 leading-relaxed">
                        We may update our Privacy Policy from time to time. Therefore, you are
                        advised to review this page periodically for any changes. We will notify
                        you of any changes by posting the new Privacy Policy on this page.
                        These changes are effective immediately after they are posted.
                    </p>
                </div>

                {/* NEW: CONTACT */}
                <div>
                    <h2 className="text-xl font-semibold text-yellow-400 mb-2">
                        Contact Us
                    </h2>
                    <p className="text-gray-300 leading-relaxed">
                        If you have any questions or suggestions about our Privacy Policy,
                        do not hesitate to contact us at{" "}
                        <a
                            href="mailto:hopestdhanaf@gmail.com"
                            className="text-yellow-400 underline hover:text-yellow-300"
                        >
                            hopestdhanaf@gmail.com
                        </a>.
                    </p>
                </div>

            </div>

            {/* FOOTER */}
            <p className="mt-10 text-xs text-gray-500">
                © 2025 HOPEST · hope for the best
            </p>

        </div>
    );
}