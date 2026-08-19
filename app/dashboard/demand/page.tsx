export default function DemandPage() {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 bg-white  min-h-screen">
        {/* Decorative Top Accent */}
        <div className="w-12 h-1.5 bg-[#4b3425] mb-8"></div>
  
        {/* Hero Headline */}
        <h1 className="text-3xl md:text-4xl  font-extrabold text-gray-900 leading-tight mb-10">
          This is a relevant question in this era — what is its relevance when there are apps like WhatsApp, Facebook, etc.?
        </h1>
  
        {/* Body Content with Left Accent Border */}
        <div className="border-l-4 border-[#4b3425] pl-8 space-y-8 mb-12">
          <p className="text-lg text-gray-600 leading-relaxed">
            What usually happens between us is when we lose or get something, or our loved ones go 
            missing, we rely on WhatsApp, Facebook, etc. But the reality is that it is not possible 
            to get the message to the people quickly. Similarly, it is doubtful whether the 
            message is getting through to the real people.
          </p>
  
          <p className="text-lg text-gray-600 leading-relaxed">
            Once the message reaches real people, we can see that it spreads without being able to 
            delete it, and this is where we can understand the need for{" "}
            <span className="font-bold text-[#4b3425]">Hopest</span>, an application.
          </p>
        </div>
  
        {/* Highlighted Footer Card */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
          <p className="text-xl font-semibold text-gray-800 text-center leading-snug">
            What we Malayalis need to do is to spread the Hopest application to everyone as 
            much as possible, but only reminding that it will be useful for every person.
          </p>
        </div>
        
        {/* Contact Line */}
        <p className="mt-8 text-center text-gray-500 font-medium">
          For all your help you can contact the Hopest team...
        </p>
      </div>
    );
  }