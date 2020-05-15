describe("timeConverter", function() {
  it("12: 07 am", function() {
    assert.equal(timeConverter('12: 06 am'), '00:06');
  });

  it("03.2 pm", function() {
    assert.equal(timeConverter('03.2 pm'), '15:02');
  });

  it("1-17 am", function() {
    assert.equal(timeConverter('1-17 am'), '01:17');
  });

  it("34:67", function() {
    assert.equal(isNaN(timeConverter('34:67')), true);
  });

  it("0-17 am", function() {
    assert.equal(timeConverter('0-17 am'), '00:17');
  });

  it("0-7 pm", function() {
    assert.equal(isNaN(timeConverter('0-7 am')), true);
  });

  it("12: 07", function() {
    assert.equal(timeConverter('12: 07'), '12:07');
  });
});
