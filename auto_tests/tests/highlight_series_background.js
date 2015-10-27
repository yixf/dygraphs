/**
 * @fileoverview Tests for the highlightSeriesBackgroundAlpha and
 * highlightSeriesBackgroundColor options.
 * @author sergeyslepian@gmail.com
 */

import Dygraph from '../../src/dygraph';
import * as utils from '../../src/dygraph-utils';
import Util from './Util';

describe("highlight-series-background", function() {

  cleanupAfterEach();

  function setupGraph(highlightSeriesBackgroundAlpha,
                      highlightSeriesBackgroundColor) {
    var opts = {
      width: 480,
      height: 320,
      labels: ['x', 'y'],
      legend: 'always',
      highlightSeriesOpts: {
        strokeWidth: 1,
        strokeBorderWidth: 1,
        highlightCircleSize: 1
      }
    };

    if (highlightSeriesBackgroundAlpha) utils.update(opts, {highlightSeriesBackgroundAlpha});
    if (highlightSeriesBackgroundColor) utils.update(opts, {highlightSeriesBackgroundColor});

    var data = [];
    for (var j = 0; j < 10; j++) {
      data.push([j, 0]);
    }

    return new Dygraph('graph', data, opts);
  }

  it('testDefaultHighlight', function(done) {
    var graph = setupGraph();

    assert.deepEqual(Util.samplePixel(graph.canvas_, 100, 100), [0,0,0,0]);

    graph.setSelection(0, 'y', true);

    // handle background color fade-in time
    setTimeout(function() {
      assert.deepEqual(Util.samplePixel(graph.canvas_, 100, 100), [255,255,255,127]);
      done();
    }, 1000);
  });

  it('testNoHighlight', function(done) {
    var graph = setupGraph(1);

    assert.deepEqual(Util.samplePixel(graph.canvas_, 100, 100), [0,0,0,0]);

    graph.setSelection(0, 'y', true);

    // handle background color fade-in time
    setTimeout(function() {
      assert.deepEqual(Util.samplePixel(graph.canvas_, 100, 100), [0,0,0,0]);
      done();
    }, 1000);
  });

  it('testCustomHighlightColor', function(done) {
    var graph = setupGraph(null, 'rgb(0,255,255)');

    assert.deepEqual(Util.samplePixel(graph.canvas_, 100, 100), [0,0,0,0]);

    graph.setSelection(0, 'y', true);

    // handle background color fade-in time
    setTimeout(function() {
      assert.deepEqual(Util.samplePixel(graph.canvas_, 100, 100), [0,255,255,127]);
      done();
    }, 1000);
  });

  it('testCustomHighlightAlpha', function(done) {
    var graph = setupGraph(0.3);

    assert.deepEqual(Util.samplePixel(graph.canvas_, 100, 100), [0,0,0,0]);

    graph.setSelection(0, 'y', true);

    // handle background color fade-in time
    setTimeout(function() {
      assert.deepEqual(Util.samplePixel(graph.canvas_, 100, 100), [255,255,255,179]);
      done();
    }, 1000);
  });

  it('testCustomHighlightColorAndAlpha', function(done) {
    var graph = setupGraph(0.7,'rgb(255,0,0)');

    assert.deepEqual(Util.samplePixel(graph.canvas_, 100, 100), [0,0,0,0]);

    graph.setSelection(0, 'y', true);

    // handle background color fade-in time
    setTimeout(function() {
      assert.deepEqual(Util.samplePixel(graph.canvas_, 100, 100), [255,0,0,76]);
      done();
    }, 1000);
  });
});