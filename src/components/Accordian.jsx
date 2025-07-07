import React, { useState } from "react";

const data = [
  {
    title: "Do I have to allow the use of cookies?",
    answer:
      "Unicorn vinyl poutine brooklyn, next level direct trade iceland. Shaman copper mug church-key coloring book, whatever poutine normcore fixie cred kickstarter post-ironic street art."
  },
  {
    title: "How do I change my My Page password?",
    answer:
      "Coloring book forage photo booth gentrify lumbersexual. Migas chillwave poutine synth shoreditch, enamel pin thundercats fashion axe roof party polaroid chartreuse."
  },
  {
    title: "What is BankID?",
    answer:
      "Enamel pin fam sustainable woke whatever venmo. Authentic asymmetrical put a bird on it, lumbersexual activated charcoal kinfolk banjo cred pickled sartorial."
  }
];

const Accordion = () => {
  const [showAnswer, setShowAnswer] = useState(new Array(data.length).fill(false));
  const [multiOpen, setMultiOpen] = useState(false);

  const toggleAnswer = (idx) => {
    setShowAnswer((prev) => {
      if (multiOpen) {
        const updated = [...prev];
        updated[idx] = !updated[idx];
        return updated;
      } else {
        return prev.map((_, index) => index === idx ? !prev[idx] : false);
      }
    });
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 bg-white rounded shadow">
      <div className="flex items-center mb-4">
        <input
          id="multi-open"
          type="checkbox"
          className="mr-2"
          checked={multiOpen}
          onChange={() => setMultiOpen(!multiOpen)}
        />
        <label htmlFor="multi-open" className="text-sm text-gray-700">
          Allow multiple answers to be open
        </label>
      </div>

      {data.map((item, idx) => (
        <div key={idx} className="border-b border-gray-300 py-3">
          <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleAnswer(idx)}>
            <h3 className="text-lg text-gray-800 font-medium">{item.title}</h3>
            <span className="text-blue-600 text-xl font-bold">{showAnswer[idx] ? "−" : "+"}</span>
          </div>
          {showAnswer[idx] && (
            <p className="mt-2 text-gray-600">{item.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
