"use babel";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Haskell = {
  "Selection Based": {
    command: "ghc",
    args: function args(context) {
      return ["-e", context.getCode()];
    }
  },

  "File Based": {
    command: "runhaskell",
    args: function args(_ref) {
      var filepath = _ref.filepath;

      return [filepath];
    }
  }
};

var LiterateHaskell = { "File Based": Haskell["File Based"] };

var HaskellGrammars = {
  Haskell: Haskell,
  "Literate Haskell": LiterateHaskell
};
exports["default"] = HaskellGrammars;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvY2tuanUvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9ncmFtbWFycy9oYXNrZWxsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFdBQVcsQ0FBQTs7Ozs7QUFFWCxJQUFNLE9BQU8sR0FBRztBQUNkLG1CQUFpQixFQUFFO0FBQ2pCLFdBQU8sRUFBRSxLQUFLO0FBQ2QsUUFBSSxFQUFBLGNBQUMsT0FBTyxFQUFFO0FBQ1osYUFBTyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQTtLQUNqQztHQUNGOztBQUVELGNBQVksRUFBRTtBQUNaLFdBQU8sRUFBRSxZQUFZO0FBQ3JCLFFBQUksRUFBQSxjQUFDLElBQVksRUFBRTtVQUFaLFFBQVEsR0FBVixJQUFZLENBQVYsUUFBUTs7QUFDYixhQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7S0FDbEI7R0FDRjtDQUNGLENBQUE7O0FBRUQsSUFBTSxlQUFlLEdBQUcsRUFBRSxZQUFZLEVBQUUsT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUE7O0FBRS9ELElBQU0sZUFBZSxHQUFHO0FBQ3RCLFNBQU8sRUFBUCxPQUFPO0FBQ1Asb0JBQWtCLEVBQUUsZUFBZTtDQUNwQyxDQUFBO3FCQUNjLGVBQWUiLCJmaWxlIjoiZmlsZTovLy9DOi9Vc2Vycy9ja25qdS8uYXRvbS9wYWNrYWdlcy9zY3JpcHQvbGliL2dyYW1tYXJzL2hhc2tlbGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBiYWJlbFwiXG5cbmNvbnN0IEhhc2tlbGwgPSB7XG4gIFwiU2VsZWN0aW9uIEJhc2VkXCI6IHtcbiAgICBjb21tYW5kOiBcImdoY1wiLFxuICAgIGFyZ3MoY29udGV4dCkge1xuICAgICAgcmV0dXJuIFtcIi1lXCIsIGNvbnRleHQuZ2V0Q29kZSgpXVxuICAgIH0sXG4gIH0sXG5cbiAgXCJGaWxlIEJhc2VkXCI6IHtcbiAgICBjb21tYW5kOiBcInJ1bmhhc2tlbGxcIixcbiAgICBhcmdzKHsgZmlsZXBhdGggfSkge1xuICAgICAgcmV0dXJuIFtmaWxlcGF0aF1cbiAgICB9LFxuICB9LFxufVxuXG5jb25zdCBMaXRlcmF0ZUhhc2tlbGwgPSB7IFwiRmlsZSBCYXNlZFwiOiBIYXNrZWxsW1wiRmlsZSBCYXNlZFwiXSB9XG5cbmNvbnN0IEhhc2tlbGxHcmFtbWFycyA9IHtcbiAgSGFza2VsbCxcbiAgXCJMaXRlcmF0ZSBIYXNrZWxsXCI6IExpdGVyYXRlSGFza2VsbCxcbn1cbmV4cG9ydCBkZWZhdWx0IEhhc2tlbGxHcmFtbWFyc1xuIl19