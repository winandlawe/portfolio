(function() {
  var AskStackApiClient, request;

  request = require('request');

  module.exports = AskStackApiClient = (function() {
    function AskStackApiClient() {}

    AskStackApiClient.question = '';

    AskStackApiClient.tag = '';

    AskStackApiClient.page = 1;

    AskStackApiClient.sort_by = 'votes';

    AskStackApiClient.search = function(callback) {
      var options;
      options = {
        uri: "https://api.stackexchange.com" + "/2.2/search/advanced?pagesize=5&" + ("page=" + this.page + "&") + "order=desc&" + ("sort=" + this.sort_by + "&") + ("q=" + (encodeURIComponent(this.question.trim())) + "&") + ("tagged=" + (encodeURIComponent(this.tag.trim())) + "&") + "site=stackoverflow&" + "filter=!b0OfNKD*3O569e",
        method: 'GET',
        gzip: true,
        headers: {
          'User-Agent': 'Atom-Ask-Stack'
        }
      };
      if (process.env.http_proxy != null) {
        options.proxy = process.env.http_proxy;
      }
      return request(options, function(error, res, body) {
        var response;
        if (!error && res.statusCode === 200) {
          try {
            return response = JSON.parse(body);
          } catch (error1) {
            console.log("Error: Invalid JSON");
            return response = null;
          } finally {
            callback(response);
          }
        } else {
          console.log("Error: " + error, "Result: ", res);
          return response = null;
        }
      });
    };

    AskStackApiClient.resetInputs = function() {
      this.question = '';
      this.tag = '';
      this.page = 1;
      return this.sort_by = 'votes';
    };

    return AskStackApiClient;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9DOi9Vc2Vycy9ja25qdS8uYXRvbS9wYWNrYWdlcy9hc2stc3RhY2svbGliL2Fzay1zdGFjay1hcGktY2xpZW50LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O0VBQUEsT0FBQSxHQUFVLE9BQUEsQ0FBUSxTQUFSOztFQUVWLE1BQU0sQ0FBQyxPQUFQLEdBU007OztJQUdKLGlCQUFDLENBQUEsUUFBRCxHQUFZOztJQUNaLGlCQUFDLENBQUEsR0FBRCxHQUFPOztJQUNQLGlCQUFDLENBQUEsSUFBRCxHQUFROztJQUNSLGlCQUFDLENBQUEsT0FBRCxHQUFXOztJQUVYLGlCQUFDLENBQUEsTUFBRCxHQUFTLFNBQUMsUUFBRDtBQUNQLFVBQUE7TUFBQSxPQUFBLEdBQ0U7UUFBQSxHQUFBLEVBQUssK0JBQUEsR0FDSCxrQ0FERyxHQUVILENBQUEsT0FBQSxHQUFRLElBQUMsQ0FBQSxJQUFULEdBQWMsR0FBZCxDQUZHLEdBR0gsYUFIRyxHQUlILENBQUEsT0FBQSxHQUFRLElBQUMsQ0FBQSxPQUFULEdBQWlCLEdBQWpCLENBSkcsR0FLSCxDQUFBLElBQUEsR0FBSSxDQUFDLGtCQUFBLENBQW1CLElBQUMsQ0FBQSxRQUFRLENBQUMsSUFBVixDQUFBLENBQW5CLENBQUQsQ0FBSixHQUEwQyxHQUExQyxDQUxHLEdBTUgsQ0FBQSxTQUFBLEdBQVMsQ0FBQyxrQkFBQSxDQUFtQixJQUFDLENBQUEsR0FBRyxDQUFDLElBQUwsQ0FBQSxDQUFuQixDQUFELENBQVQsR0FBMEMsR0FBMUMsQ0FORyxHQU9ILHFCQVBHLEdBUUgsd0JBUkY7UUFTQSxNQUFBLEVBQVEsS0FUUjtRQVVBLElBQUEsRUFBTSxJQVZOO1FBV0EsT0FBQSxFQUNFO1VBQUEsWUFBQSxFQUFjLGdCQUFkO1NBWkY7O01BY0YsSUFBMEMsOEJBQTFDO1FBQUEsT0FBTyxDQUFDLEtBQVIsR0FBZ0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUE1Qjs7YUFFQSxPQUFBLENBQVEsT0FBUixFQUFpQixTQUFDLEtBQUQsRUFBUSxHQUFSLEVBQWEsSUFBYjtBQUNmLFlBQUE7UUFBQSxJQUFHLENBQUksS0FBSixJQUFjLEdBQUcsQ0FBQyxVQUFKLEtBQWtCLEdBQW5DO0FBQ0U7bUJBQ0UsUUFBQSxHQUFXLElBQUksQ0FBQyxLQUFMLENBQVcsSUFBWCxFQURiO1dBQUEsY0FBQTtZQUdFLE9BQU8sQ0FBQyxHQUFSLENBQVkscUJBQVo7bUJBQ0EsUUFBQSxHQUFXLEtBSmI7V0FBQTtZQU1FLFFBQUEsQ0FBUyxRQUFULEVBTkY7V0FERjtTQUFBLE1BQUE7VUFTRSxPQUFPLENBQUMsR0FBUixDQUFZLFNBQUEsR0FBVSxLQUF0QixFQUErQixVQUEvQixFQUEyQyxHQUEzQztpQkFDQSxRQUFBLEdBQVcsS0FWYjs7TUFEZSxDQUFqQjtJQWxCTzs7SUErQlQsaUJBQUMsQ0FBQSxXQUFELEdBQWMsU0FBQTtNQUNaLElBQUMsQ0FBQSxRQUFELEdBQVk7TUFDWixJQUFDLENBQUEsR0FBRCxHQUFPO01BQ1AsSUFBQyxDQUFBLElBQUQsR0FBUTthQUNSLElBQUMsQ0FBQSxPQUFELEdBQVc7SUFKQzs7Ozs7QUFsRGhCIiwic291cmNlc0NvbnRlbnQiOlsicmVxdWVzdCA9IHJlcXVpcmUgJ3JlcXVlc3QnXG5cbm1vZHVsZS5leHBvcnRzID1cbiNcbiMgV2l0aCB0aGUgY3VycmVudCBtb2RlbCB3aGVyZSB3ZSBjYW4gb25seSBoYXZlIDEgcmVzdWx0IHBhZ2Ugb3BlbmVkIGF0IG9uY2VcbiMgdGhpcyBjbGFzcyBpcyBcInN0YXRpY1wiIGJlY2F1c2Ugd2Ugd2FudCB0byBzaGFyZSB0aGUgQVBJIGNsaWVudCBiZXR3ZWVuIHRoZVxuIyB2aWV3cyBlYXNpbHkuIFRoaXMgd2F5IHdlIGNhbiBsb2FkIG1vcmUgcmVzdWx0cyBieSBrZWVwaW5nIHRyYWNrIG9mIHRoZSBsYXN0XG4jIHJlcXVlc3RlZCBwYWdlLiBJZiBhdCBzb21lIHBvaW50IHdlIGRlY2lkZSB3ZSBjYW4gaGF2ZSBtb3JlIHRoYW4gb25lIHJlc3VsdFxuIyBwYWdlIGF0IHRoZSBzYW1lIHRpbWUgdGhpcyBjbGFzcyBzaG91bGQgYmUgaW5zdGFuY2lhdGVkIGFuZCBwYXNzZWQgZnJvbSB0aGVcbiMgJ0FzayBTdGFjaycgdmlldyB0byB0aGUgcmVzdWx0IHZpZXcuXG4jXG5jbGFzcyBBc2tTdGFja0FwaUNsaWVudFxuXG4gICMgUHJvcGVydGllc1xuICBAcXVlc3Rpb24gPSAnJ1xuICBAdGFnID0gJydcbiAgQHBhZ2UgPSAxXG4gIEBzb3J0X2J5ID0gJ3ZvdGVzJ1xuXG4gIEBzZWFyY2g6IChjYWxsYmFjaykgLT5cbiAgICBvcHRpb25zID1cbiAgICAgIHVyaTogXCJodHRwczovL2FwaS5zdGFja2V4Y2hhbmdlLmNvbVwiICtcbiAgICAgICAgXCIvMi4yL3NlYXJjaC9hZHZhbmNlZD9wYWdlc2l6ZT01JlwiICtcbiAgICAgICAgXCJwYWdlPSN7QHBhZ2V9JlwiICtcbiAgICAgICAgXCJvcmRlcj1kZXNjJlwiICtcbiAgICAgICAgXCJzb3J0PSN7QHNvcnRfYnl9JlwiICtcbiAgICAgICAgXCJxPSN7ZW5jb2RlVVJJQ29tcG9uZW50KEBxdWVzdGlvbi50cmltKCkpfSZcIiArXG4gICAgICAgIFwidGFnZ2VkPSN7ZW5jb2RlVVJJQ29tcG9uZW50KEB0YWcudHJpbSgpKX0mXCIgK1xuICAgICAgICBcInNpdGU9c3RhY2tvdmVyZmxvdyZcIiArXG4gICAgICAgIFwiZmlsdGVyPSFiME9mTktEKjNPNTY5ZVwiXG4gICAgICBtZXRob2Q6ICdHRVQnXG4gICAgICBnemlwOiB0cnVlXG4gICAgICBoZWFkZXJzOlxuICAgICAgICAnVXNlci1BZ2VudCc6ICdBdG9tLUFzay1TdGFjaydcblxuICAgIG9wdGlvbnMucHJveHkgPSBwcm9jZXNzLmVudi5odHRwX3Byb3h5IGlmIHByb2Nlc3MuZW52Lmh0dHBfcHJveHk/XG5cbiAgICByZXF1ZXN0IG9wdGlvbnMsIChlcnJvciwgcmVzLCBib2R5KSAtPlxuICAgICAgaWYgbm90IGVycm9yIGFuZCByZXMuc3RhdHVzQ29kZSBpcyAyMDBcbiAgICAgICAgdHJ5XG4gICAgICAgICAgcmVzcG9uc2UgPSBKU09OLnBhcnNlKGJvZHkpXG4gICAgICAgIGNhdGNoXG4gICAgICAgICAgY29uc29sZS5sb2cgXCJFcnJvcjogSW52YWxpZCBKU09OXCJcbiAgICAgICAgICByZXNwb25zZSA9IG51bGxcbiAgICAgICAgZmluYWxseVxuICAgICAgICAgIGNhbGxiYWNrKHJlc3BvbnNlKVxuICAgICAgZWxzZVxuICAgICAgICBjb25zb2xlLmxvZyBcIkVycm9yOiAje2Vycm9yfVwiLCBcIlJlc3VsdDogXCIsIHJlc1xuICAgICAgICByZXNwb25zZSA9IG51bGxcblxuICBAcmVzZXRJbnB1dHM6IC0+XG4gICAgQHF1ZXN0aW9uID0gJydcbiAgICBAdGFnID0gJydcbiAgICBAcGFnZSA9IDFcbiAgICBAc29ydF9ieSA9ICd2b3RlcydcbiJdfQ==
