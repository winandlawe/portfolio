(function() {
  var $, $$$, AskStackApiClient, AskStackResultView, ScrollView, hljs, ref,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  ref = require('atom-space-pen-views'), $ = ref.$, $$$ = ref.$$$, ScrollView = ref.ScrollView;

  AskStackApiClient = require('./ask-stack-api-client');

  hljs = require('highlight.js');

  window.jQuery = $;

  require('./vendor/bootstrap.min.js');

  module.exports = AskStackResultView = (function(superClass) {
    extend(AskStackResultView, superClass);

    function AskStackResultView() {
      return AskStackResultView.__super__.constructor.apply(this, arguments);
    }

    AskStackResultView.content = function() {
      return this.div({
        "class": 'ask-stack-result native-key-bindings',
        tabindex: -1
      }, (function(_this) {
        return function() {
          _this.div({
            id: 'results-view',
            outlet: 'resultsView'
          });
          _this.div({
            id: 'load-more',
            "class": 'load-more',
            click: 'loadMoreResults',
            outlet: 'loadMore'
          }, function() {
            return _this.a({
              href: '#loadmore'
            }, function() {
              return _this.span('Load More...');
            });
          });
          return _this.div({
            id: 'progressIndicator',
            "class": 'progressIndicator',
            outlet: 'progressIndicator'
          }, function() {
            return _this.span({
              "class": 'loading loading-spinner-medium'
            });
          });
        };
      })(this));
    };

    AskStackResultView.prototype.initialize = function() {
      return AskStackResultView.__super__.initialize.apply(this, arguments);
    };

    AskStackResultView.prototype.getTitle = function() {
      return 'Ask Stack Results';
    };

    AskStackResultView.prototype.getURI = function() {
      return 'ask-stack://result-view';
    };

    AskStackResultView.prototype.getIconName = function() {
      return 'three-bars';
    };

    AskStackResultView.prototype.onDidChangeTitle = function() {};

    AskStackResultView.prototype.onDidChangeModified = function() {};

    AskStackResultView.prototype.handleEvents = function() {
      this.subscribe(this, 'core:move-up', (function(_this) {
        return function() {
          return _this.scrollUp();
        };
      })(this));
      return this.subscribe(this, 'core:move-down', (function(_this) {
        return function() {
          return _this.scrollDown();
        };
      })(this));
    };

    AskStackResultView.prototype.renderAnswers = function(answersJson, loadMore) {
      var i, j, len, len1, question, ref1, ref2, results;
      if (loadMore == null) {
        loadMore = false;
      }
      this.answersJson = answersJson;
      if (!loadMore) {
        this.resultsView.html('');
      }
      if (answersJson['items'].length === 0) {
        return this.html('<br><center>Your search returned no matches.</center>');
      } else {
        ref1 = answersJson['items'];
        for (i = 0, len = ref1.length; i < len; i++) {
          question = ref1[i];
          this.renderQuestionHeader(question);
        }
        ref2 = answersJson['items'];
        results = [];
        for (j = 0, len1 = ref2.length; j < len1; j++) {
          question = ref2[j];
          results.push(this.renderQuestionBody(question));
        }
        return results;
      }
    };

    AskStackResultView.prototype.renderQuestionHeader = function(question) {
      var display_name, html, questionHeader, question_id, title, toggleBtn;
      title = $('<div/>').html(question['title']).text();
      display_name = $('<textarea />').html(question['owner'].display_name).text();
      question_id = question['question_id'];
      questionHeader = $$$(function() {
        return this.div({
          id: question['question_id'],
          "class": 'ui-result'
        }, (function(_this) {
          return function() {
            _this.h2({
              "class": 'title'
            }, function() {
              _this.a({
                href: question['link'],
                id: "question-link-" + question_id,
                "class": 'underline title-string'
              }, title);
              _this.div({
                "class": 'score',
                title: question['score'] + ' Votes'
              }, function() {
                return _this.p(question['score']);
              });
              _this.div({
                "class": 'answers',
                title: question['answer_count'] + ' Answers'
              }, function() {
                return _this.p(question['answer_count']);
              });
              return _this.div({
                "class": 'is-accepted'
              }, function() {
                if (question['accepted_answer_id']) {
                  return _this.p({
                    "class": 'icon icon-check',
                    title: 'This question has an accepted answer'
                  });
                }
              });
            });
            _this.div({
              "class": 'created'
            }, function() {
              _this.text(new Date(question['creation_date'] * 1000).toLocaleString());
              _this.text(' - asked by ');
              return _this.a({
                href: question['owner'].link,
                id: "question-author-link-" + question_id
              }, display_name);
            });
            _this.div({
              "class": 'tags'
            }, function() {
              var i, len, ref1, results, tag;
              ref1 = question['tags'];
              results = [];
              for (i = 0, len = ref1.length; i < len; i++) {
                tag = ref1[i];
                _this.span({
                  "class": 'label label-info'
                }, tag);
                results.push(_this.text('\n'));
              }
              return results;
            });
            return _this.div({
              "class": 'collapse-button'
            });
          };
        })(this));
      });
      toggleBtn = $('<button></button>', {
        id: "toggle-" + question['question_id'],
        type: 'button',
        "class": 'btn btn-info btn-xs',
        text: 'Show More'
      });
      toggleBtn.attr('data-toggle', 'collapse');
      toggleBtn.attr('data-target', "#question-body-" + question['question_id']);
      html = $(questionHeader).find('.collapse-button').append(toggleBtn).parent();
      return this.resultsView.append(html);
    };

    AskStackResultView.prototype.renderQuestionBody = function(question) {
      var answer_tab, curAnswer, div, quesId;
      curAnswer = 0;
      quesId = question['question_id'];
      if (question['answer_count'] > 0) {
        answer_tab = "<a href='#prev" + quesId + "'><< Prev</a>   <span id='curAnswer-" + quesId + "'>" + (curAnswer + 1) + "</span>/" + question['answers'].length + "  <a href='#next" + quesId + "'>Next >></a> ";
      } else {
        answer_tab = "<br><b>This question has not been answered.</b>";
      }
      div = $('<div></div>', {
        id: "question-body-" + question['question_id'],
        "class": "collapse hidden"
      });
      div.html("<ul class='nav nav-tabs nav-justified'> <li class='active'><a href='#question-" + quesId + "' data-toggle='tab'>Question</a></li> <li><a href='#answers-" + quesId + "' data-toggle='tab'>Answers</a></li> </ul> <div id='question-body-" + question['question_id'] + "-nav' class='tab-content hidden'> <div class='tab-pane active' id='question-" + quesId + "'>" + question['body'] + "</div> <div class='tab-pane answer-navigation' id='answers-" + quesId + "'> <center>" + answer_tab + "</center> </div> </div>");
      $("#" + quesId).append(div);
      this.highlightCode("question-" + quesId);
      this.addCodeButtons("question-" + quesId, quesId, 'question');
      if (question['answer_count'] > 0) {
        this.renderAnswerBody(question['answers'][curAnswer], quesId);
        this.setupNavigation(question, curAnswer);
      }
      return $("#toggle-" + quesId).click(function(event) {
        var btn;
        btn = $(this);
        if ($("#question-body-" + quesId).hasClass('in')) {
          $("#question-body-" + quesId).addClass('hidden');
          $("#question-body-" + quesId + "-nav").addClass('hidden');
          btn.parents("#" + quesId).append(btn.parent());
          return $(this).text('Show More');
        } else {
          $("#question-body-" + quesId).removeClass('hidden');
          $("#question-body-" + quesId + "-nav").removeClass('hidden');
          btn.parent().siblings("#question-body-" + quesId).append(btn.parent());
          return btn.text('Show Less');
        }
      });
    };

    AskStackResultView.prototype.renderAnswerBody = function(answer, question_id) {
      var answerHtml, answer_id, display_name;
      display_name = $('<textarea/>').html(answer['owner'].display_name).text();
      answer_id = answer['answer_id'];
      answerHtml = $$$(function() {
        return this.div((function(_this) {
          return function() {
            _this.a({
              href: answer['link'],
              id: "answer-link-" + answer_id
            }, function() {
              return _this.span({
                "class": 'answer-link',
                title: 'Open in browser'
              }, '➚');
            });
            if (answer['is_accepted']) {
              _this.span({
                "class": 'label label-success'
              }, 'Accepted');
            }
            _this.div({
              "class": 'score answer',
              title: answer['score'] + ' Votes'
            }, function() {
              return _this.p(answer['score']);
            });
            _this.div({
              "class": 'score is-accepted'
            }, function() {
              if (answer['is_accepted']) {
                return _this.p({
                  "class": 'icon icon-check',
                  title: 'Accepted answer'
                });
              }
            });
            return _this.div({
              "class": 'created'
            }, function() {
              _this.text(new Date(answer['creation_date'] * 1000).toLocaleString());
              _this.text(' - answered by ');
              return _this.a({
                href: answer['owner'].link,
                id: "answer-author-link-" + answer_id
              }, display_name);
            });
          };
        })(this));
      });
      $("#answers-" + question_id).append($(answerHtml).append(answer['body']));
      this.highlightCode("answers-" + question_id);
      return this.addCodeButtons("answers-" + question_id, answer_id, 'answer');
    };

    AskStackResultView.prototype.highlightCode = function(elem_id) {
      var code, codeHl, i, len, pre, pres, results;
      pres = this.resultsView.find("#" + elem_id).find('pre');
      results = [];
      for (i = 0, len = pres.length; i < len; i++) {
        pre = pres[i];
        code = $(pre).children('code').first();
        if (code !== void 0) {
          codeHl = hljs.highlightAuto(code.text()).value;
          results.push(code.html(codeHl));
        } else {
          results.push(void 0);
        }
      }
      return results;
    };

    AskStackResultView.prototype.addCodeButtons = function(elem_id, id, id_type) {
      var btnInsert, i, len, pre, pres, results;
      pres = this.resultsView.find("#" + elem_id).find('pre');
      results = [];
      for (i = 0, len = pres.length; i < len; i++) {
        pre = pres[i];
        btnInsert = this.genCodeButton('Insert', id, id_type);
        results.push($(pre).prev().after(btnInsert));
      }
      return results;
    };

    AskStackResultView.prototype.genCodeButton = function(type, id, id_type) {
      var btn;
      btn = $('<button/>', {
        text: type,
        "class": 'btn btn-default btn-xs'
      });
      if (type === 'Insert') {
        $(btn).click(function(event) {
          var author_name, author_src, code, editor, source_src;
          code = $(this).next('pre').text();
          if (code !== void 0) {
            atom.workspace.activatePreviousPane();
            editor = atom.workspace.getActivePaneItem();
            if (id !== void 0) {
              author_src = $("#" + id_type + "-author-link-" + id).attr('href');
              author_name = $("#" + id_type + "-author-link-" + id).html();
              source_src = $("#" + id_type + "-link-" + id).attr('href');
              return editor.transact((function(_this) {
                return function() {
                  editor.insertText("Author: " + author_name + " - " + author_src, {
                    select: true
                  });
                  editor.toggleLineCommentsInSelection();
                  editor.insertNewlineBelow();
                  editor.insertText("Source: " + source_src, {
                    select: true
                  });
                  editor.toggleLineCommentsInSelection();
                  editor.insertNewlineBelow();
                  return editor.insertText(code);
                };
              })(this));
            } else {
              return editor.insertText(code);
            }
          }
        });
      }
      return btn;
    };

    AskStackResultView.prototype.loadMoreResults = function() {
      if (this.answersJson['has_more']) {
        this.progressIndicator.show();
        this.loadMore.hide();
        AskStackApiClient.page = AskStackApiClient.page + 1;
        return AskStackApiClient.search((function(_this) {
          return function(response) {
            _this.loadMore.show();
            _this.progressIndicator.hide();
            return _this.renderAnswers(response, true);
          };
        })(this));
      } else {
        return $('#load-more').children().children('span').text('No more results to load.');
      }
    };

    AskStackResultView.prototype.setupNavigation = function(question, curAnswer) {
      var quesId;
      quesId = question['question_id'];
      $("a[href='#next" + quesId + "']").click((function(_this) {
        return function(event) {
          if (curAnswer + 1 >= question['answers'].length) {
            curAnswer = 0;
          } else {
            curAnswer += 1;
          }
          $("#answers-" + quesId).children().last().remove();
          $("#curAnswer-" + quesId)[0].innerText = curAnswer + 1;
          return _this.renderAnswerBody(question['answers'][curAnswer], quesId);
        };
      })(this));
      return $("a[href='#prev" + quesId + "']").click((function(_this) {
        return function(event) {
          if (curAnswer - 1 < 0) {
            curAnswer = question['answers'].length - 1;
          } else {
            curAnswer -= 1;
          }
          $("#answers-" + quesId).children().last().remove();
          $("#curAnswer-" + quesId)[0].innerText = curAnswer + 1;
          return _this.renderAnswerBody(question['answers'][curAnswer], quesId);
        };
      })(this));
    };

    return AskStackResultView;

  })(ScrollView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9DOi9Vc2Vycy9ja25qdS8uYXRvbS9wYWNrYWdlcy9hc2stc3RhY2svbGliL2Fzay1zdGFjay1yZXN1bHQtdmlldy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBLG9FQUFBO0lBQUE7OztFQUFBLE1BQXVCLE9BQUEsQ0FBUSxzQkFBUixDQUF2QixFQUFDLFNBQUQsRUFBSSxhQUFKLEVBQVM7O0VBQ1QsaUJBQUEsR0FBb0IsT0FBQSxDQUFRLHdCQUFSOztFQUNwQixJQUFBLEdBQU8sT0FBQSxDQUFRLGNBQVI7O0VBRVAsTUFBTSxDQUFDLE1BQVAsR0FBZ0I7O0VBQ2hCLE9BQUEsQ0FBUSwyQkFBUjs7RUFFQSxNQUFNLENBQUMsT0FBUCxHQUNNOzs7Ozs7O0lBQ0osa0JBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQTthQUNSLElBQUMsQ0FBQSxHQUFELENBQUs7UUFBQSxDQUFBLEtBQUEsQ0FBQSxFQUFPLHNDQUFQO1FBQStDLFFBQUEsRUFBVSxDQUFDLENBQTFEO09BQUwsRUFBa0UsQ0FBQSxTQUFBLEtBQUE7ZUFBQSxTQUFBO1VBQ2hFLEtBQUMsQ0FBQSxHQUFELENBQUs7WUFBQSxFQUFBLEVBQUksY0FBSjtZQUFvQixNQUFBLEVBQVEsYUFBNUI7V0FBTDtVQUNBLEtBQUMsQ0FBQSxHQUFELENBQUs7WUFBQSxFQUFBLEVBQUksV0FBSjtZQUFpQixDQUFBLEtBQUEsQ0FBQSxFQUFPLFdBQXhCO1lBQXFDLEtBQUEsRUFBTyxpQkFBNUM7WUFBK0QsTUFBQSxFQUFRLFVBQXZFO1dBQUwsRUFBd0YsU0FBQTttQkFDdEYsS0FBQyxDQUFBLENBQUQsQ0FBRztjQUFBLElBQUEsRUFBTSxXQUFOO2FBQUgsRUFBc0IsU0FBQTtxQkFDcEIsS0FBQyxDQUFBLElBQUQsQ0FBTyxjQUFQO1lBRG9CLENBQXRCO1VBRHNGLENBQXhGO2lCQUdBLEtBQUMsQ0FBQSxHQUFELENBQUs7WUFB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ZUFBQSxHQUFnQixNQUFoQixHQUF1QixJQUF6QixDQUE2QixDQUFDLEtBQTlCLENBQW9DLENBQUEsU0FBQSxLQUFBO2VBQUEsU0FBQyxLQUFEO1VBQ2hDLElBQUcsU0FBQSxHQUFVLENBQVYsR0FBYyxDQUFqQjtZQUF3QixTQUFBLEdBQVksUUFBUyxDQUFBLFNBQUEsQ0FBVSxDQUFDLE1BQXBCLEdBQTJCLEVBQS9EO1dBQUEsTUFBQTtZQUFzRSxTQUFBLElBQWEsRUFBbkY7O1VBQ0EsQ0FBQSxDQUFFLFdBQUEsR0FBWSxNQUFkLENBQXVCLENBQUMsUUFBeEIsQ0FBQSxDQUFrQyxDQUFDLElBQW5DLENBQUEsQ0FBeUMsQ0FBQyxNQUExQyxDQUFBO1VBQ0EsQ0FBQSxDQUFFLGFBQUEsR0FBYyxNQUFoQixDQUEwQixDQUFBLENBQUEsQ0FBRSxDQUFDLFNBQTdCLEdBQXlDLFNBQUEsR0FBVTtpQkFDbkQsS0FBQyxDQUFBLGdCQUFELENBQWtCLFFBQVMsQ0FBQSxTQUFBLENBQVcsQ0FBQSxTQUFBLENBQXRDLEVBQWtELE1BQWxEO1FBSmdDO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFwQztJQVZlOzs7O0tBNU9jO0FBUmpDIiwic291cmNlc0NvbnRlbnQiOlsieyQsICQkJCwgU2Nyb2xsVmlld30gPSByZXF1aXJlICdhdG9tLXNwYWNlLXBlbi12aWV3cydcbkFza1N0YWNrQXBpQ2xpZW50ID0gcmVxdWlyZSAnLi9hc2stc3RhY2stYXBpLWNsaWVudCdcbmhsanMgPSByZXF1aXJlICdoaWdobGlnaHQuanMnXG5cbndpbmRvdy5qUXVlcnkgPSAkXG5yZXF1aXJlICcuL3ZlbmRvci9ib290c3RyYXAubWluLmpzJ1xuXG5tb2R1bGUuZXhwb3J0cyA9XG5jbGFzcyBBc2tTdGFja1Jlc3VsdFZpZXcgZXh0ZW5kcyBTY3JvbGxWaWV3XG4gIEBjb250ZW50OiAtPlxuICAgIEBkaXYgY2xhc3M6ICdhc2stc3RhY2stcmVzdWx0IG5hdGl2ZS1rZXktYmluZGluZ3MnLCB0YWJpbmRleDogLTEsID0+XG4gICAgICBAZGl2IGlkOiAncmVzdWx0cy12aWV3Jywgb3V0bGV0OiAncmVzdWx0c1ZpZXcnXG4gICAgICBAZGl2IGlkOiAnbG9hZC1tb3JlJywgY2xhc3M6ICdsb2FkLW1vcmUnLCBjbGljazogJ2xvYWRNb3JlUmVzdWx0cycsIG91dGxldDogJ2xvYWRNb3JlJywgPT5cbiAgICAgICAgQGEgaHJlZjogJyNsb2FkbW9yZScsID0+XG4gICAgICAgICAgQHNwYW4gICdMb2FkIE1vcmUuLi4nXG4gICAgICBAZGl2IGlkOiAncHJvZ3Jlc3NJbmRpY2F0b3InLCBjbGFzczogJ3Byb2dyZXNzSW5kaWNhdG9yJywgb3V0bGV0OiAncHJvZ3Jlc3NJbmRpY2F0b3InLCA9PlxuICAgICAgICBAc3BhbiBjbGFzczogJ2xvYWRpbmcgbG9hZGluZy1zcGlubmVyLW1lZGl1bSdcblxuICBpbml0aWFsaXplOiAtPlxuICAgIHN1cGVyXG5cbiAgZ2V0VGl0bGU6IC0+XG4gICAgJ0FzayBTdGFjayBSZXN1bHRzJ1xuXG4gIGdldFVSSTogLT5cbiAgICAnYXNrLXN0YWNrOi8vcmVzdWx0LXZpZXcnXG5cbiAgZ2V0SWNvbk5hbWU6IC0+XG4gICAgJ3RocmVlLWJhcnMnXG5cbiAgb25EaWRDaGFuZ2VUaXRsZTogLT5cbiAgb25EaWRDaGFuZ2VNb2RpZmllZDogLT5cblxuICBoYW5kbGVFdmVudHM6IC0+XG4gICAgQHN1YnNjcmliZSB0aGlzLCAnY29yZTptb3ZlLXVwJywgPT4gQHNjcm9sbFVwKClcbiAgICBAc3Vic2NyaWJlIHRoaXMsICdjb3JlOm1vdmUtZG93bicsID0+IEBzY3JvbGxEb3duKClcblxuICByZW5kZXJBbnN3ZXJzOiAoYW5zd2Vyc0pzb24sIGxvYWRNb3JlID0gZmFsc2UpIC0+XG4gICAgQGFuc3dlcnNKc29uID0gYW5zd2Vyc0pzb25cblxuICAgICMgQ2xlYW4gdXAgSFRNTCBpZiB3ZSBhcmUgbG9hZGluZyBhIG5ldyBzZXQgb2YgYW5zd2Vyc1xuICAgIEByZXN1bHRzVmlldy5odG1sKCcnKSB1bmxlc3MgbG9hZE1vcmVcblxuICAgIGlmIGFuc3dlcnNKc29uWydpdGVtcyddLmxlbmd0aCA9PSAwXG4gICAgICB0aGlzLmh0bWwoJzxicj48Y2VudGVyPllvdXIgc2VhcmNoIHJldHVybmVkIG5vIG1hdGNoZXMuPC9jZW50ZXI+JylcbiAgICBlbHNlXG4gICAgICAjIFJlbmRlciB0aGUgcXVlc3Rpb24gaGVhZGVycyBmaXJzdFxuICAgICAgZm9yIHF1ZXN0aW9uIGluIGFuc3dlcnNKc29uWydpdGVtcyddXG4gICAgICAgIEByZW5kZXJRdWVzdGlvbkhlYWRlcihxdWVzdGlvbilcblxuICAgICAgIyBUaGVuIHJlbmRlciB0aGUgcXVlc3Rpb25zIGFuZCBhbnN3ZXJzXG4gICAgICBmb3IgcXVlc3Rpb24gaW4gYW5zd2Vyc0pzb25bJ2l0ZW1zJ11cbiAgICAgICAgQHJlbmRlclF1ZXN0aW9uQm9keShxdWVzdGlvbilcblxuICByZW5kZXJRdWVzdGlvbkhlYWRlcjogKHF1ZXN0aW9uKSAtPlxuICAgICMgRGVjb2RlIHRpdGxlIGh0bWwgZW50aXRpZXNcbiAgICB0aXRsZSA9ICQoJzxkaXYvPicpLmh0bWwocXVlc3Rpb25bJ3RpdGxlJ10pLnRleHQoKTtcbiAgICAjIERlY29kZSBkaXNwbGF5X25hbWUgaHRtbCBlbnRpdGllc1xuICAgIGRpc3BsYXlfbmFtZSA9ICQoJzx0ZXh0YXJlYSAvPicpLmh0bWwocXVlc3Rpb25bJ293bmVyJ10uZGlzcGxheV9uYW1lKS50ZXh0KCk7XG4gICAgIyBTdG9yZSB0aGUgcXVlc3Rpb24gaWQuXG4gICAgcXVlc3Rpb25faWQgPSBxdWVzdGlvblsncXVlc3Rpb25faWQnXTtcblxuICAgIHF1ZXN0aW9uSGVhZGVyID0gJCQkIC0+XG4gICAgICBAZGl2IGlkOiBxdWVzdGlvblsncXVlc3Rpb25faWQnXSwgY2xhc3M6ICd1aS1yZXN1bHQnLCA9PlxuICAgICAgICBAaDIgY2xhc3M6ICd0aXRsZScsID0+XG4gICAgICAgICAgQGEgaHJlZjogcXVlc3Rpb25bJ2xpbmsnXSwgaWQ6IFwicXVlc3Rpb24tbGluay0je3F1ZXN0aW9uX2lkfVwiLCBjbGFzczogJ3VuZGVybGluZSB0aXRsZS1zdHJpbmcnLCB0aXRsZVxuICAgICAgICAgICMgQWRkZWQgdG9vbHRpcCB0byBleHBsYWluIHRoYXQgdGhlIHZhbHVlIGlzIHRoZSBudW1iZXIgb2Ygdm90ZXNcbiAgICAgICAgICBAZGl2IGNsYXNzOiAnc2NvcmUnLCB0aXRsZTogcXVlc3Rpb25bJ3Njb3JlJ10gKyAnIFZvdGVzJywgPT5cbiAgICAgICAgICAgIEBwIHF1ZXN0aW9uWydzY29yZSddXG4gICAgICAgICAgIyBBZGRlZCBhIG5ldyBiYWRnZSBmb3Igc2hvd2luZyB0aGUgdG90YWwgbnVtYmVyIG9mIGFuc3dlcnMsIGFuZCBhIHRvb2x0aXAgdG8gZXhwbGFpbiB0aGF0IHRoZSB2YWx1ZSBpcyB0aGUgbnVtYmVyIG9mIGFuc3dlcnNcbiAgICAgICAgICBAZGl2IGNsYXNzOiAnYW5zd2VycycsIHRpdGxlOiBxdWVzdGlvblsnYW5zd2VyX2NvdW50J10gKyAnIEFuc3dlcnMnLCA9PlxuICAgICAgICAgICAgQHAgcXVlc3Rpb25bJ2Fuc3dlcl9jb3VudCddXG4gICAgICAgICAgIyBBZGRlZCBhIGNoZWNrIG1hcmsgdG8gc2hvdyB0aGF0IHRoZSBxdWVzdGlvbiBoYXMgYW4gYWNjZXB0ZWQgYW5zd2VyXG4gICAgICAgICAgQGRpdiBjbGFzczogJ2lzLWFjY2VwdGVkJywgPT5cbiAgICAgICAgICAgIEBwIGNsYXNzOiAnaWNvbiBpY29uLWNoZWNrJywgdGl0bGU6ICdUaGlzIHF1ZXN0aW9uIGhhcyBhbiBhY2NlcHRlZCBhbnN3ZXInIGlmIHF1ZXN0aW9uWydhY2NlcHRlZF9hbnN3ZXJfaWQnXVxuICAgICAgICBAZGl2IGNsYXNzOiAnY3JlYXRlZCcsID0+XG4gICAgICAgICAgQHRleHQgbmV3IERhdGUocXVlc3Rpb25bJ2NyZWF0aW9uX2RhdGUnXSAqIDEwMDApLnRvTG9jYWxlU3RyaW5nKClcbiAgICAgICAgICAjIEFkZGVkIGNyZWRpdHMgb2Ygd2hvIGFza2VkIHRoZSBxdWVzdGlvbiwgd2l0aCBhIGxpbmsgYmFjayB0byB0aGVpciBwcm9maWxlXG4gICAgICAgICAgQHRleHQgJyAtIGFza2VkIGJ5ICdcbiAgICAgICAgICBAYSBocmVmOiBxdWVzdGlvblsnb3duZXInXS5saW5rLCBpZDogXCJxdWVzdGlvbi1hdXRob3ItbGluay0je3F1ZXN0aW9uX2lkfVwiLCBkaXNwbGF5X25hbWVcbiAgICAgICAgQGRpdiBjbGFzczogJ3RhZ3MnLCA9PlxuICAgICAgICAgIGZvciB0YWcgaW4gcXVlc3Rpb25bJ3RhZ3MnXVxuICAgICAgICAgICAgQHNwYW4gY2xhc3M6ICdsYWJlbCBsYWJlbC1pbmZvJywgdGFnXG4gICAgICAgICAgICBAdGV4dCAnXFxuJ1xuICAgICAgICBAZGl2IGNsYXNzOiAnY29sbGFwc2UtYnV0dG9uJ1xuXG4gICAgIyBTcGFjZS1wZW4gZG9lc24ndCBzZWVtIHRvIHN1cHBvcnQgdGhlIGRhdGEtdG9nZ2xlIGFuZCBkYXRhLXRhcmdldCBhdHRyaWJ1dGVzXG4gICAgdG9nZ2xlQnRuID0gJCgnPGJ1dHRvbj48L2J1dHRvbj4nLCB7XG4gICAgICBpZDogXCJ0b2dnbGUtI3txdWVzdGlvblsncXVlc3Rpb25faWQnXX1cIixcbiAgICAgIHR5cGU6ICdidXR0b24nLFxuICAgICAgY2xhc3M6ICdidG4gYnRuLWluZm8gYnRuLXhzJyxcbiAgICAgIHRleHQ6ICdTaG93IE1vcmUnXG4gICAgfSlcbiAgICB0b2dnbGVCdG4uYXR0cignZGF0YS10b2dnbGUnLCAnY29sbGFwc2UnKVxuICAgIHRvZ2dsZUJ0bi5hdHRyKCdkYXRhLXRhcmdldCcsIFwiI3F1ZXN0aW9uLWJvZHktI3txdWVzdGlvblsncXVlc3Rpb25faWQnXX1cIilcblxuICAgIGh0bWwgPSAkKHF1ZXN0aW9uSGVhZGVyKS5maW5kKCcuY29sbGFwc2UtYnV0dG9uJykuYXBwZW5kKHRvZ2dsZUJ0bikucGFyZW50KClcbiAgICBAcmVzdWx0c1ZpZXcuYXBwZW5kKGh0bWwpXG5cbiAgcmVuZGVyUXVlc3Rpb25Cb2R5OiAocXVlc3Rpb24pIC0+XG4gICAgY3VyQW5zd2VyID0gMFxuICAgIHF1ZXNJZCA9IHF1ZXN0aW9uWydxdWVzdGlvbl9pZCddXG5cbiAgICAjIFRoaXMgaXMgbW9zdGx5IG9ubHkgcmVuZGVyZWQgaGVyZSBhbmQgbm90IHdpdGggdGhlIGFuc3dlciBiZWNhdXNlIHdlIG5lZWRcbiAgICAjIHRoZSBmdWxsIHF1ZXN0aW9uIG9iamVjdCB0byBrbm93IGhvdyBtYW55IGFuc3dlcnMgdGhlcmUgYXJlLiBNaWdodCBiZSBhIGdvb2RcbiAgICAjIHRoaW5nIHRvIHJlZmFjdG9yIHRoaXMgYXQgc29tZSBwb2ludCBhbmQgcmVuZGVyIHRoZSBuYXZpZ2F0aW9uIHdpdGggdGhlIGFuc3dlci5cbiAgICBpZiBxdWVzdGlvblsnYW5zd2VyX2NvdW50J10gPiAwXG4gICAgICBhbnN3ZXJfdGFiID0gXCI8YSBocmVmPScjcHJldiN7cXVlc0lkfSc+PDwgUHJldjwvYT4gICA8c3BhbiBpZD0nY3VyQW5zd2VyLSN7cXVlc0lkfSc+I3tjdXJBbnN3ZXIrMX08L3NwYW4+LyN7cXVlc3Rpb25bJ2Fuc3dlcnMnXS5sZW5ndGh9ICA8YSBocmVmPScjbmV4dCN7cXVlc0lkfSc+TmV4dCA+PjwvYT4gXCJcbiAgICBlbHNlXG4gICAgICBhbnN3ZXJfdGFiID0gXCI8YnI+PGI+VGhpcyBxdWVzdGlvbiBoYXMgbm90IGJlZW4gYW5zd2VyZWQuPC9iPlwiXG5cbiAgICAjIExlYXZpbmcgYXMgSFRNTCBmb3Igbm93IGFzIHNwYWNlLXBlbiBkb2Vzbid0IHN1cHBvcnQgZGF0YS10b2dnbGUgYXR0cmlidXRlXG4gICAgIyBBbHNvIHN0cnVnZ2xpbmcgd2l0aCA8Y2VudGVyPiBhbmQgdGhlIG5hdmlnYXRpb24gbGlua1xuICAgIGRpdiA9ICQoJzxkaXY+PC9kaXY+Jywge1xuICAgICAgaWQ6IFwicXVlc3Rpb24tYm9keS0je3F1ZXN0aW9uWydxdWVzdGlvbl9pZCddfVwiXG4gICAgICBjbGFzczogXCJjb2xsYXBzZSBoaWRkZW5cIlxuICAgICAgfSlcbiAgICBkaXYuaHRtbChcIlxuICAgIDx1bCBjbGFzcz0nbmF2IG5hdi10YWJzIG5hdi1qdXN0aWZpZWQnPlxuICAgICAgPGxpIGNsYXNzPSdhY3RpdmUnPjxhIGhyZWY9JyNxdWVzdGlvbi0je3F1ZXNJZH0nIGRhdGEtdG9nZ2xlPSd0YWInPlF1ZXN0aW9uPC9hPjwvbGk+XG4gICAgICA8bGk+PGEgaHJlZj0nI2Fuc3dlcnMtI3txdWVzSWR9JyBkYXRhLXRvZ2dsZT0ndGFiJz5BbnN3ZXJzPC9hPjwvbGk+XG4gICAgPC91bD5cbiAgICA8ZGl2IGlkPSdxdWVzdGlvbi1ib2R5LSN7cXVlc3Rpb25bJ3F1ZXN0aW9uX2lkJ119LW5hdicgY2xhc3M9J3RhYi1jb250ZW50IGhpZGRlbic+XG4gICAgICA8ZGl2IGNsYXNzPSd0YWItcGFuZSBhY3RpdmUnIGlkPSdxdWVzdGlvbi0je3F1ZXNJZH0nPiN7cXVlc3Rpb25bJ2JvZHknXX08L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9J3RhYi1wYW5lIGFuc3dlci1uYXZpZ2F0aW9uJyBpZD0nYW5zd2Vycy0je3F1ZXNJZH0nPlxuICAgICAgICA8Y2VudGVyPiN7YW5zd2VyX3RhYn08L2NlbnRlcj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlwiKVxuXG4gICAgJChcIiMje3F1ZXNJZH1cIikuYXBwZW5kKGRpdilcblxuICAgIEBoaWdobGlnaHRDb2RlKFwicXVlc3Rpb24tI3txdWVzSWR9XCIpXG4gICAgQGFkZENvZGVCdXR0b25zKFwicXVlc3Rpb24tI3txdWVzSWR9XCIsIHF1ZXNJZCwgJ3F1ZXN0aW9uJylcbiAgICBpZiBxdWVzdGlvblsnYW5zd2VyX2NvdW50J10gPiAwXG4gICAgICBAcmVuZGVyQW5zd2VyQm9keShxdWVzdGlvblsnYW5zd2VycyddW2N1ckFuc3dlcl0sIHF1ZXNJZClcbiAgICAgIEBzZXR1cE5hdmlnYXRpb24ocXVlc3Rpb24sIGN1ckFuc3dlcilcblxuICAgICMgUXVlc3Rpb24gdG9nZ2xlIGJ1dHRvblxuICAgICQoXCIjdG9nZ2xlLSN7cXVlc0lkfVwiKS5jbGljayAoZXZlbnQpIC0+XG4gICAgICBidG4gPSAkKHRoaXMpXG4gICAgICBpZiAoICQoXCIjcXVlc3Rpb24tYm9keS0je3F1ZXNJZH1cIikuaGFzQ2xhc3MoJ2luJykgKVxuICAgICAgICAkKFwiI3F1ZXN0aW9uLWJvZHktI3txdWVzSWR9XCIpLmFkZENsYXNzKCdoaWRkZW4nKVxuICAgICAgICAkKFwiI3F1ZXN0aW9uLWJvZHktI3txdWVzSWR9LW5hdlwiKS5hZGRDbGFzcygnaGlkZGVuJylcbiAgICAgICAgYnRuLnBhcmVudHMoXCIjI3txdWVzSWR9XCIpLmFwcGVuZChidG4ucGFyZW50KCkpXG4gICAgICAgICQodGhpcykudGV4dCgnU2hvdyBNb3JlJylcbiAgICAgIGVsc2VcbiAgICAgICAgJChcIiNxdWVzdGlvbi1ib2R5LSN7cXVlc0lkfVwiKS5yZW1vdmVDbGFzcygnaGlkZGVuJylcbiAgICAgICAgJChcIiNxdWVzdGlvbi1ib2R5LSN7cXVlc0lkfS1uYXZcIikucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpXG4gICAgICAgIGJ0bi5wYXJlbnQoKS5zaWJsaW5ncyhcIiNxdWVzdGlvbi1ib2R5LSN7cXVlc0lkfVwiKS5hcHBlbmQoYnRuLnBhcmVudCgpKVxuICAgICAgICBidG4udGV4dCgnU2hvdyBMZXNzJylcblxuICByZW5kZXJBbnN3ZXJCb2R5OiAoYW5zd2VyLCBxdWVzdGlvbl9pZCkgLT5cbiAgICAjIERlY29kZSBkaXNwbGF5X25hbWUgaHRtbCBlbnRpdGllc1xuICAgIGRpc3BsYXlfbmFtZSA9ICQoJzx0ZXh0YXJlYS8+JykuaHRtbChhbnN3ZXJbJ293bmVyJ10uZGlzcGxheV9uYW1lKS50ZXh0KCk7XG4gICAgIyBTdG9yZSB0aGUgYW5zd2VyIGlkLlxuICAgIGFuc3dlcl9pZCA9IGFuc3dlclsnYW5zd2VyX2lkJ107XG5cbiAgICBhbnN3ZXJIdG1sID0gJCQkIC0+XG4gICAgICBAZGl2ID0+XG4gICAgICAgIEBhIGhyZWY6IGFuc3dlclsnbGluayddLCBpZDogXCJhbnN3ZXItbGluay0je2Fuc3dlcl9pZH1cIiwgPT5cbiAgICAgICAgICBAc3BhbiBjbGFzczogJ2Fuc3dlci1saW5rJywgdGl0bGU6ICdPcGVuIGluIGJyb3dzZXInLCAn4p6aJ1xuICAgICAgICBAc3BhbiBjbGFzczogJ2xhYmVsIGxhYmVsLXN1Y2Nlc3MnLCAnQWNjZXB0ZWQnIGlmIGFuc3dlclsnaXNfYWNjZXB0ZWQnXVxuICAgICAgICAjIEFkZGVkIHRvb2x0aXAgdG8gZXhwbGFpbiB0aGF0IHRoZSB2YWx1ZSBpcyB0aGUgbnVtYmVyIG9mIHZvdGVzXG4gICAgICAgIEBkaXYgY2xhc3M6ICdzY29yZSBhbnN3ZXInLCB0aXRsZTogYW5zd2VyWydzY29yZSddICsgJyBWb3RlcycsID0+XG4gICAgICAgICAgQHAgYW5zd2VyWydzY29yZSddXG4gICAgICAgICMgQWRkZWQgYSBjaGVjayBtYXJrIHRvIHNob3cgdGhhdCB0aGlzIGlzIHRoZSBhY2NlcHRlZCBhbnN3ZXJcbiAgICAgICAgQGRpdiBjbGFzczogJ3Njb3JlIGlzLWFjY2VwdGVkJywgPT5cbiAgICAgICAgICBAcCBjbGFzczogJ2ljb24gaWNvbi1jaGVjaycsIHRpdGxlOiAnQWNjZXB0ZWQgYW5zd2VyJyBpZiBhbnN3ZXJbJ2lzX2FjY2VwdGVkJ11cbiAgICAgICAgIyBBZGRlZCBjcmVkaXRzIG9mIHdobyBhbnN3ZXJlZCB0aGUgcXVlc3Rpb24sIHdpdGggYSBsaW5rIGJhY2sgdG8gdGhlaXIgcHJvZmlsZSwgYW5kIGFsc28gd2hlbiBpdCB3YXMgYW5zd2VyZWRcbiAgICAgICAgQGRpdiBjbGFzczogJ2NyZWF0ZWQnLCA9PlxuICAgICAgICAgIEB0ZXh0IG5ldyBEYXRlKGFuc3dlclsnY3JlYXRpb25fZGF0ZSddICogMTAwMCkudG9Mb2NhbGVTdHJpbmcoKVxuICAgICAgICAgIEB0ZXh0ICcgLSBhbnN3ZXJlZCBieSAnXG4gICAgICAgICAgQGEgaHJlZjogYW5zd2VyWydvd25lciddLmxpbmssIGlkOiBcImFuc3dlci1hdXRob3ItbGluay0je2Fuc3dlcl9pZH1cIiwgZGlzcGxheV9uYW1lXG5cbiAgICAkKFwiI2Fuc3dlcnMtI3txdWVzdGlvbl9pZH1cIikuYXBwZW5kKCQoYW5zd2VySHRtbCkuYXBwZW5kKGFuc3dlclsnYm9keSddKSlcblxuICAgIEBoaWdobGlnaHRDb2RlKFwiYW5zd2Vycy0je3F1ZXN0aW9uX2lkfVwiKVxuICAgIEBhZGRDb2RlQnV0dG9ucyhcImFuc3dlcnMtI3txdWVzdGlvbl9pZH1cIiwgYW5zd2VyX2lkLCAnYW5zd2VyJylcblxuICBoaWdobGlnaHRDb2RlOiAoZWxlbV9pZCkgLT5cbiAgICBwcmVzID0gQHJlc3VsdHNWaWV3LmZpbmQoXCIjI3tlbGVtX2lkfVwiKS5maW5kKCdwcmUnKVxuICAgIGZvciBwcmUgaW4gcHJlc1xuICAgICAgY29kZSA9ICQocHJlKS5jaGlsZHJlbignY29kZScpLmZpcnN0KClcbiAgICAgIGlmKGNvZGUgIT0gdW5kZWZpbmVkKVxuICAgICAgICBjb2RlSGwgPSAgaGxqcy5oaWdobGlnaHRBdXRvKGNvZGUudGV4dCgpKS52YWx1ZVxuICAgICAgICBjb2RlLmh0bWwoY29kZUhsKVxuXG4gIGFkZENvZGVCdXR0b25zOiAoZWxlbV9pZCwgaWQsIGlkX3R5cGUpIC0+XG4gICAgcHJlcyA9IEByZXN1bHRzVmlldy5maW5kKFwiIyN7ZWxlbV9pZH1cIikuZmluZCgncHJlJylcbiAgICBmb3IgcHJlIGluIHByZXNcbiAgICAgIGJ0bkluc2VydCA9IEBnZW5Db2RlQnV0dG9uKCdJbnNlcnQnLCBpZCwgaWRfdHlwZSlcbiAgICAgICQocHJlKS5wcmV2KCkuYWZ0ZXIoYnRuSW5zZXJ0KVxuXG4gIGdlbkNvZGVCdXR0b246ICh0eXBlLCBpZCwgaWRfdHlwZSkgLT5cbiAgICBidG4gPSAkKCc8YnV0dG9uLz4nLFxuICAgIHtcbiAgICAgICAgdGV4dDogdHlwZSxcbiAgICAgICAgY2xhc3M6ICdidG4gYnRuLWRlZmF1bHQgYnRuLXhzJ1xuICAgIH0pXG4gICAgaWYgdHlwZSA9PSAnSW5zZXJ0J1xuICAgICAgJChidG4pLmNsaWNrIChldmVudCkgLT5cbiAgICAgICAgY29kZSA9ICQodGhpcykubmV4dCgncHJlJykudGV4dCgpXG4gICAgICAgIGlmIGNvZGUgIT0gdW5kZWZpbmVkXG4gICAgICAgICAgYXRvbS53b3Jrc3BhY2UuYWN0aXZhdGVQcmV2aW91c1BhbmUoKVxuICAgICAgICAgICMgZWRpdG9yID0gYXRvbS53b3Jrc3BhY2UuYWN0aXZlUGFuZUl0ZW1cbiAgICAgICAgICBlZGl0b3IgPSBhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVQYW5lSXRlbSgpXG5cbiAgICAgICAgICAjIENoZWNrIGlmIGFuIGlkIHdhcyBwYXNzZWQgaW4gdG8gZmluZCBpbmZvcm1hdGlvbiBhYm91dCB0aGUgYXV0aG9yIGFuZCBzb3VyY2VcbiAgICAgICAgICBpZiBpZCAhPSB1bmRlZmluZWRcbiAgICAgICAgICAgICMgR2V0IHRoZSBhdHRyaWJ1dGUgYXV0aG9yIGFuZCBzb3VyY2UgaW5mb3JtYXRpb25cbiAgICAgICAgICAgIGF1dGhvcl9zcmMgPSAkKFwiIyN7aWRfdHlwZX0tYXV0aG9yLWxpbmstI3tpZH1cIikuYXR0cignaHJlZicpO1xuICAgICAgICAgICAgYXV0aG9yX25hbWUgPSAkKFwiIyN7aWRfdHlwZX0tYXV0aG9yLWxpbmstI3tpZH1cIikuaHRtbCgpO1xuICAgICAgICAgICAgc291cmNlX3NyYyA9ICQoXCIjI3tpZF90eXBlfS1saW5rLSN7aWR9XCIpLmF0dHIoJ2hyZWYnKTtcblxuICAgICAgICAgICAgIyBUcmFuc2FjdCB0aGUgZm9sbG93aW5nIGFkZGl0aW9ucyBzbyB0aGF0IHRoZXkgYXJlIGFsbCBpbiBvbmUgdW5kbyBpbnN0YW5jZVxuICAgICAgICAgICAgZWRpdG9yLnRyYW5zYWN0ID0+XG4gICAgICAgICAgICAgICMgSW5zZXJ0IHRoZSBhdXRob3IgaW5mb3JtYXRpb25cbiAgICAgICAgICAgICAgZWRpdG9yLmluc2VydFRleHQoXCJBdXRob3I6ICN7YXV0aG9yX25hbWV9IC0gI3thdXRob3Jfc3JjfVwiLCB7c2VsZWN0OiB0cnVlfSlcbiAgICAgICAgICAgICAgZWRpdG9yLnRvZ2dsZUxpbmVDb21tZW50c0luU2VsZWN0aW9uKCk7XG4gICAgICAgICAgICAgIGVkaXRvci5pbnNlcnROZXdsaW5lQmVsb3coKTtcblxuICAgICAgICAgICAgICAjIEluc2VydCB0aGUgc291cmNlIGluZm9ybWF0aW9uXG4gICAgICAgICAgICAgIGVkaXRvci5pbnNlcnRUZXh0KFwiU291cmNlOiAje3NvdXJjZV9zcmN9XCIsIHtzZWxlY3Q6IHRydWV9KVxuICAgICAgICAgICAgICBlZGl0b3IudG9nZ2xlTGluZUNvbW1lbnRzSW5TZWxlY3Rpb24oKTtcbiAgICAgICAgICAgICAgZWRpdG9yLmluc2VydE5ld2xpbmVCZWxvdygpO1xuXG4gICAgICAgICAgICAgICMgSW5zZXJ0IHRoZSBjb2RlXG4gICAgICAgICAgICAgIGVkaXRvci5pbnNlcnRUZXh0KGNvZGUpO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGVkaXRvci5pbnNlcnRUZXh0KGNvZGUpXG4gICAgcmV0dXJuIGJ0blxuXG4gIGxvYWRNb3JlUmVzdWx0czogLT5cbiAgICBpZiBAYW5zd2Vyc0pzb25bJ2hhc19tb3JlJ11cbiAgICAgIEBwcm9ncmVzc0luZGljYXRvci5zaG93KClcbiAgICAgIEBsb2FkTW9yZS5oaWRlKClcbiAgICAgIEFza1N0YWNrQXBpQ2xpZW50LnBhZ2UgPSBBc2tTdGFja0FwaUNsaWVudC5wYWdlICsgMVxuICAgICAgQXNrU3RhY2tBcGlDbGllbnQuc2VhcmNoIChyZXNwb25zZSkgPT5cbiAgICAgICAgQGxvYWRNb3JlLnNob3coKVxuICAgICAgICBAcHJvZ3Jlc3NJbmRpY2F0b3IuaGlkZSgpXG4gICAgICAgIEByZW5kZXJBbnN3ZXJzKHJlc3BvbnNlLCB0cnVlKVxuICAgIGVsc2VcbiAgICAgICQoJyNsb2FkLW1vcmUnKS5jaGlsZHJlbigpLmNoaWxkcmVuKCdzcGFuJykudGV4dCgnTm8gbW9yZSByZXN1bHRzIHRvIGxvYWQuJylcblxuICBzZXR1cE5hdmlnYXRpb246IChxdWVzdGlvbiwgY3VyQW5zd2VyKSAtPlxuICAgIHF1ZXNJZCA9IHF1ZXN0aW9uWydxdWVzdGlvbl9pZCddXG5cbiAgICAjIEFuc3dlcnMgbmF2aWdhdGlvblxuICAgICQoXCJhW2hyZWY9JyNuZXh0I3txdWVzSWR9J11cIikuY2xpY2sgKGV2ZW50KSA9PlxuICAgICAgICBpZiBjdXJBbnN3ZXIrMSA+PSBxdWVzdGlvblsnYW5zd2VycyddLmxlbmd0aCB0aGVuIGN1ckFuc3dlciA9IDAgZWxzZSBjdXJBbnN3ZXIgKz0gMVxuICAgICAgICAkKFwiI2Fuc3dlcnMtI3txdWVzSWR9XCIpLmNoaWxkcmVuKCkubGFzdCgpLnJlbW92ZSgpXG4gICAgICAgICQoXCIjY3VyQW5zd2VyLSN7cXVlc0lkfVwiKVswXS5pbm5lclRleHQgPSBjdXJBbnN3ZXIrMVxuICAgICAgICBAcmVuZGVyQW5zd2VyQm9keShxdWVzdGlvblsnYW5zd2VycyddW2N1ckFuc3dlcl0sIHF1ZXNJZClcblxuICAgICQoXCJhW2hyZWY9JyNwcmV2I3txdWVzSWR9J11cIikuY2xpY2sgKGV2ZW50KSA9PlxuICAgICAgICBpZiBjdXJBbnN3ZXItMSA8IDAgdGhlbiBjdXJBbnN3ZXIgPSBxdWVzdGlvblsnYW5zd2VycyddLmxlbmd0aC0xIGVsc2UgY3VyQW5zd2VyIC09IDFcbiAgICAgICAgJChcIiNhbnN3ZXJzLSN7cXVlc0lkfVwiKS5jaGlsZHJlbigpLmxhc3QoKS5yZW1vdmUoKVxuICAgICAgICAkKFwiI2N1ckFuc3dlci0je3F1ZXNJZH1cIilbMF0uaW5uZXJUZXh0ID0gY3VyQW5zd2VyKzFcbiAgICAgICAgQHJlbmRlckFuc3dlckJvZHkocXVlc3Rpb25bJ2Fuc3dlcnMnXVtjdXJBbnN3ZXJdLCBxdWVzSWQpXG4iXX0=
