module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name: String,
        imageLink: String,
        destinationLink: String
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Campaign = mongoose.model("campaign", schema);
    return Campaign;
  };