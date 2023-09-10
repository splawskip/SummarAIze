import {
  linkIcon,
} from '../../assets';

export default function Results() {
  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2">
        <form className="relative flex justify-center items-center" onSubmit={() => {}}>
          <img src={linkIcon} alt="Link Icon" className="absolute left-0 my-2 ml-3 w-5" />
          <input type="url" placeholder="Enter a URL" name="" id="" value="" onChange={() => {}} required className="url_input peer" />
          <button type="submit" className="submit_btn peer-focus:border-gray-700 per-focus:text-gray-700">
            ⮐
          </button>
        </form>
      </div>
    </section>
  );
}
