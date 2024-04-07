export default function HeroMain() {
  return (
    <>
      <div className="w-full min-h-[550px] flex pt-20 md:pt-24 justify-center bg-main bg-cover bg-center">
        <div className="w-full max-w-screen-lg px-3">
          <div className="bg-white/50 sm:bg-transparent text-black font-abril-fatface leading-tight md:leading-none transition">
            <p className="ps-5 text-[80px] md:text-[100px]">Record</p>
            <p className="ps-5 md:ps-20">
              <span className="text-[40px] md:text-[50px]">What You </span>
              <span className="text-[60px] md:text-[80px]">EAT</span>
            </p>
          </div>
          <div className="w-full md:w-3/5 mt-5 p-5 leading-relaxed bg-green-900/90 sm:bg-white/70 inline-block transition">
            <p className="text-white sm:text-black">
              Here, you can easily record what you eat and track your progress
              towards a healthier lifestyle.
              <br />
              By logging your meals and checking off your dietary intake, you'll
              gain valuable insights into your eating habits and be better
              equipped to maintain your overall health.
              <br /> Start today and take control of your well-being!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
