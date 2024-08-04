const mongoose = require("mongoose");
const Prompt = require("../models/prompt"); // Make sure this path is correct

// DB Connection 
async function dbconnection(){
    await mongoose.connect("mongodb://127.0.0.1:27017/adMaterialScience", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

dbconnection()
    .then(() => {
        console.log("DB connected successfully");

        // Sample data to be added
        const sampleData = [
            {
                title: "Composite Materials",
                conversation: [
                    {
                        question: "What are composite materials?",
                        answer: "Composite materials are engineered materials made from two or more constituent materials with significantly different physical or chemical properties."
                    },
                    {
                        question: "What are the advantages of using composite materials?",
                        answer: "Composite materials offer high strength-to-weight ratios, corrosion resistance, design flexibility, and potentially lower costs in specific applications."
                    }
                ]
            },
            {
                title: "Matrix Materials",
                conversation: [
                    {
                        question: "What is a matrix material in composites?",
                        answer: "The matrix material in composites binds the fibers together, transfers loads between fibers, and protects them from environmental and mechanical damage."
                    },
                    {
                        question: "What types of matrix materials are commonly used?",
                        answer: "Common matrix materials include polymers (such as epoxy, polyester, and vinyl ester), metals (such as aluminum and titanium), and ceramics (such as silicon carbide and alumina)."
                    }
                ]
            },
            {
                title: "Fibers in Composites",
                conversation: [
                    {
                        question: "What role do fibers play in composite materials?",
                        answer: "Fibers in composites provide reinforcement and contribute significantly to the mechanical properties of the composite, such as strength and stiffness."
                    },
                    {
                        question: "What are some common types of fibers used in composites?",
                        answer: "Common fibers used in composites include glass fibers, carbon fibers, aramid fibers, and natural fibers (such as flax and hemp)."
                    }
                ]
            },
            {
                title: "Fiber Tensile Strength",
                conversation: [
                    {
                        question: "What is fiber tensile strength?",
                        answer: "Fiber tensile strength is the maximum stress that a fiber can withstand while being stretched or pulled before breaking."
                    },
                    {
                        question: "Why is fiber tensile strength important in composites?",
                        answer: "Fiber tensile strength is crucial in composites because it directly impacts the overall strength and load-bearing capacity of the composite material."
                    }
                ]
            },
            {
                title: "Polymer Matrix Composites",
                conversation: [
                    {
                        question: "What are polymer matrix composites (PMCs)?",
                        answer: "Polymer matrix composites are composites where the matrix is a polymer, and they are reinforced with fibers such as glass, carbon, or aramid."
                    },
                    {
                        question: "What are the advantages of polymer matrix composites?",
                        answer: "Polymer matrix composites are lightweight, have high corrosion resistance, and offer good fatigue properties and ease of manufacturing."
                    }
                ]
            },
            {
                title: "Carbon Fiber Composites",
                conversation: [
                    {
                        question: "What are carbon fiber composites?",
                        answer: "Carbon fiber composites are materials made from carbon fibers embedded in a matrix material, typically a polymer."
                    },
                    {
                        question: "What are the benefits of using carbon fiber composites?",
                        answer: "Carbon fiber composites offer high strength-to-weight ratios, excellent stiffness, and good thermal and electrical conductivity."
                    }
                ]
            }
        ];

        // Insert the sample data into the database
        Prompt.insertMany(sampleData)
            .then(() => {
                console.log("Sample data inserted successfully");
                mongoose.connection.close(); // Close the connection after insertion
            })
            .catch((err) => {
                console.error(`Error inserting sample data: ${err}`);
                mongoose.connection.close(); // Close the connection in case of error
            });
    })
    .catch((err) => {
        console.error(`Error connecting to DB: ${err}`);
    });