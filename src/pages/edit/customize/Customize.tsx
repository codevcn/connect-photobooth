export const Customize = () => {
  return (
    <div className="border border-gray-200 rounded-lg p-3 bg-white shadow-sm mt-2">
      <h3 className="text-center text-sm font-bold text-slate-700 uppercase tracking-wide mb-6">
        Personalized
      </h3>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            Choose Text Color <span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-3">
            <button className="w-12 h-12 rounded border-2 border-transparent hover:border-gray-300 focus:outline-none overflow-hidden relative group">
              <div
                className="w-full h-full bg-red-800"
                style={{
                  backgroundImage:
                    "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjOTkxYjFiIi8+CjxwYXRoIGQ9Ik0wIDBMNCA0Wk00IDBMMCA0WiIgc3Ryb2tlPSIjN2YxZDFkIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9zdmc+');",
                }}
              ></div>
            </button>
            <button className="w-12 h-12 rounded border-2 border-transparent hover:border-gray-300 focus:outline-none overflow-hidden relative group">
              <div
                className="w-full h-full bg-blue-900"
                style={{
                  backgroundImage:
                    "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMWUzYThhIi8+CjxwYXRoIGQ9Ik0wIDBMNCA0Wk00IDBMMCA0WiIgc3Ryb2tlPSIjMTczMjcxIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9zdmc+');",
                }}
              ></div>
            </button>
            <button className="w-12 h-12 rounded border-2 border-orange-500 focus:outline-none overflow-hidden relative group ring-2 ring-orange-500 ring-offset-1">
              <div
                className="w-full h-full bg-green-700"
                style={{
                  backgroundImage:
                    "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMTU4MDNkIi8+CjxwYXRoIGQ9Ik0wIDBMNCA0Wk00IDBMMCA0WiIgc3Ryb2tlPSIjMTE2NjJjIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9zdmc+');",
                }}
              ></div>
              <div className="absolute bottom-0 right-0 bg-green-600 text-white text-[10px] p-0.5 rounded-tl">
                <i className="fas fa-check"></i>
              </div>
            </button>
            <button className="w-12 h-12 rounded border-2 border-transparent hover:border-gray-300 focus:outline-none overflow-hidden relative group">
              <div
                className="w-full h-full bg-amber-700"
                style={{
                  backgroundImage:
                    "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjOTI1NDBlIi8+CjxwYXRoIGQ9Ik0wIDBMNCA0Wk00IDBMMCA0WiIgc3Ryb2tlPSIjN2UzNzBiIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9zdmc+');",
                }}
              ></div>
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            Choose Quote <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select className="block w-full pl-3 pr-10 py-2.5 text-base border border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md appearance-none bg-white text-gray-700">
              <option>--Select an option--</option>
              <option>Best Team Ever</option>
              <option>Best Mom Ever</option>
              <option>Best Dad Ever</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
              <i className="fas fa-chevron-down text-xs"></i>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            Enter Words For Scrabble (Add up to 15 Words) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            placeholder=""
          />
        </div>
      </div>
    </div>
  )
}
