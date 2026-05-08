import React, { useState } from 'react';
import { BookOpen, Hammer, Droplets, Lightbulb, FileText, PlayCircle, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

export function HelpCenterPage() {
  const [selectedCategory, setSelectedCategory] = useState('guides');

  const categories = [
    { id: 'guides', label: 'Product Guides', icon: BookOpen },
    { id: 'assembly', label: 'Assembly & Setup', icon: Hammer },
    { id: 'care', label: 'Care & Maintenance', icon: Droplets },
    { id: 'design', label: 'Design Tips', icon: Lightbulb },
    { id: 'resources', label: 'Resources', icon: FileText },
  ];

  const content = {
    guides: [
      {
        title: 'How to Choose the Right Sofa for Your Space',
        description: 'Learn how to measure your space, consider traffic flow, and select the perfect sofa style.',
        readTime: '8 min read',
        level: 'Beginner',
        content: `When choosing a sofa, consider these key factors:

        1. **Measure Your Space**: Always measure doorways, hallways, and the room itself before ordering. Consider how the sofa will be positioned and ensure adequate clearance for seating and movement.

        2. **Choose Your Style**: Consider your existing décor. Modern spaces pair well with clean-lined sofas, while traditional rooms benefit from rolled arms and tufted backs.

        3. **Select Your Fabric**: Choose between leather for durability and easy cleaning, or fabric for comfort and variety. Consider high-traffic areas and pets when selecting.

        4. **Think About Configuration**: Do you need a sectional or standard sofa? How many people need seating? Consider depth for lounging comfort.

        5. **Consider Color**: Neutral colors like gray, beige, and brown work with most décor. Statement colors can define a room but may require redecorating around them.`,
      },
      {
        title: 'Dining Table Sizing Guide',
        description: 'Get the perfect dining table size for your room and family needs.',
        readTime: '6 min read',
        level: 'Beginner',
        content: `Follow this guide to choose the right dining table size:

        1. **Room Measurements**: Allow at least 36 inches of space around all sides of the table for comfortable circulation and chair pull-out room.

        2. **Seating Capacity**: For a comfortable dining experience, allow 24 inches of width per person. A 48-inch round table seats 4, a 60-inch round seats 6, and a 72-inch round seats 8.

        3. **Rectangular Tables**: Standard dining tables are 36 inches wide. Length options range from 48 to 120 inches depending on your space.

        4. **Shape Considerations**: Round tables encourage conversation, rectangles maximize seating, and oval tables offer a good balance.

        5. **Leaf Options**: Consider extendable tables for flexibility when entertaining guests.`,
      },
      {
        title: 'Bed Size and Comfort Guide',
        description: 'Find the perfect bed size and mattress firmness for better sleep.',
        readTime: '7 min read',
        level: 'Beginner',
        content: `Understanding bed sizes and comfort levels:

        1. **Size Options**:
           - Twin: 38"W x 75"L (one person)
           - Full: 54"W x 75"L (couple or one person wanting more space)
           - Queen: 60"W x 80"L (most popular, great for couples)
           - King: 76"W x 80"L (maximum comfort for couples)

        2. **Mattress Firmness**: Firm for back sleepers, Medium for combination sleepers, Soft for side sleepers.

        3. **Frame Selection**: Ensure your bed frame can support your mattress weight and provides adequate ventilation underneath.`,
      },
    ],
    assembly: [
      {
        title: 'Basic Sofa Assembly Instructions',
        description: 'Step-by-step guide to assembling your new sofa.',
        readTime: '10 min read',
        level: 'Intermediate',
        videoUrl: '#',
        content: `Tools needed: Phillips screwdriver, rubber mallet, allen wrench

        Step 1: Lay out all components and hardware on a clean surface
        Step 2: Attach legs to the base using provided screws
        Step 3: Attach arms to the frame using brackets
        Step 4: If applicable, attach pillows and cushions
        Step 5: Test all connections for stability

        Pro Tips:
        - Have a helper for easier positioning
        - Don't over-tighten screws, which can crack wood
        - Keep the instruction manual handy for reference`,
      },
      {
        title: 'Bed Frame Assembly Guide',
        description: 'Complete instructions for assembling bed frames.',
        readTime: '12 min read',
        level: 'Intermediate',
        videoUrl: '#',
        content: `Tools needed: Drill/screwdriver, hammer, socket wrench

        Step 1: Assemble the frame rails and supports
        Step 2: Attach the headboard to the frame
        Step 3: Secure the footboard (if included)
        Step 4: Install side rails and center support
        Step 5: Add slats or mattress platform

        Pro Tips:
        - Lay out all parts before starting
        - Use a level to ensure even assembly
        - Test for squeaks before placing mattress`,
      },
      {
        title: 'Desk Setup and Organization',
        description: 'How to properly assemble and organize your workspace.',
        readTime: '8 min read',
        level: 'Beginner',
        content: `Step-by-step desktop assembly and setup tips for maximum productivity and comfort.`,
      },
    ],
    care: [
      {
        title: 'Leather Furniture Care',
        description: 'Keep your leather furniture looking new with proper care.',
        readTime: '6 min read',
        level: 'Beginner',
        content: `Leather care instructions:

        1. **Regular Cleaning**: Dust weekly with a soft cloth

        2. **Spot Cleaning**: For spills, blot immediately with a clean, dry cloth. Don't rub.

        3. **Deep Cleaning**: Use a leather-specific cleaner every 6 months. Test on a hidden area first.

        4. **Conditioning**: Condition leather every 12-18 months to maintain suppleness and prevent cracking.

        5. **Sun Protection**: Keep furniture away from direct sunlight to prevent fading.

        6. **Temperature**: Maintain room temperature between 60-80°F and humidity between 40-50%.

        7. **Avoid**: Don't use water, alcohol, or harsh chemicals. Avoid sharp objects that can scratch.`,
      },
      {
        title: 'Fabric Upholstery Maintenance',
        description: 'Best practices for cleaning and maintaining fabric furniture.',
        readTime: '7 min read',
        level: 'Beginner',
        content: `Fabric care guide:

        1. **Vacuum Regularly**: Use an upholstery attachment weekly to remove dust and debris.

        2. **Rotate Cushions**: Rotate and flip cushions monthly to ensure even wear.

        3. **Spot Clean**: For spills, immediately blot with a clean cloth. Use a fabric-safe cleaner.

        4. **Check the Code**: Look for fabric care codes (W, S, WS, X) that indicate proper cleaning methods.

        5. **Professional Cleaning**: Consider professional cleaning annually for heavily used pieces.

        6. **Protect**: Use fabric protector spray to repel stains and spills.`,
      },
      {
        title: 'Wood Furniture Polishing and Protection',
        description: 'How to maintain wood surfaces for lasting beauty.',
        readTime: '5 min read',
        level: 'Beginner',
        content: `Wood furniture maintenance:

        1. **Dust Regularly**: Use a soft, dry cloth weekly

        2. **Clean Spills**: Wipe up spills immediately to prevent staining

        3. **Polish**: Use wood polish every 3 months, following grain direction

        4. **Protect**: Use coasters and placemats to prevent water rings

        5. **Temperature**: Keep wood away from heat sources and direct sunlight

        6. **Humidity**: Maintain consistent room humidity to prevent warping`,
      },
    ],
    design: [
      {
        title: 'Small Space Furniture Arrangement',
        description: 'Maximize your living area with smart furniture placement.',
        readTime: '7 min read',
        level: 'Beginner',
        content: `Space-saving tips:

        1. **Furniture Scale**: Choose appropriately-sized pieces. Oversized furniture makes small spaces feel cramped.

        2. **Multipurpose Pieces**: Storage ottomans, nesting tables, and murphy beds save space.

        3. **Vertical Storage**: Use tall bookcases and wall-mounted shelves to draw eyes upward.

        4. **Light Colors**: Light colors and mirrors create the illusion of space.

        5. **Minimal Clutter**: Keep decorative items minimal to avoid overwhelming the space.

        6. **Traffic Flow**: Arrange furniture to maintain clear pathways through the room.`,
      },
      {
        title: 'Color Coordination Guide',
        description: 'Learn to select complementary colors for your home.',
        readTime: '8 min read',
        level: 'Beginner',
        content: `Color selection tips:

        1. **Color Wheel**: Use complementary colors (opposite on wheel) for contrast or analogous colors (adjacent) for harmony.

        2. **The 60-30-10 Rule**: Use 60% dominant color, 30% secondary, 10% accent color.

        3. **Neutral Bases**: Start with neutral furniture and add color through accessories.

        4. **Consider Light**: Natural light and artificial lighting affect how colors appear.

        5. **Test Swatches**: Get fabric and paint samples to see how they look in your space before committing.`,
      },
      {
        title: 'Creating a Cohesive Living Room Design',
        description: 'Design principles for a perfectly balanced living room.',
        readTime: '10 min read',
        level: 'Intermediate',
        content: `Design principles for beautiful rooms...`,
      },
    ],
    resources: [
      {
        title: 'Free Design Consultation',
        description: 'Schedule a free consultation with our interior design experts.',
        icon: PlayCircle,
        cta: 'Schedule Consultation',
      },
      {
        title: 'Virtual Room Planner',
        description: 'Use our online tool to visualize furniture in your space.',
        icon: PlayCircle,
        cta: 'Try Planner',
      },
      {
        title: 'Download: Furniture Placement Checklist',
        description: 'A helpful checklist for planning your furniture arrangement.',
        icon: FileText,
        cta: 'Download PDF',
      },
      {
        title: 'Video Tutorials Library',
        description: 'Browse our collection of furniture care and design videos.',
        icon: PlayCircle,
        cta: 'Watch Videos',
      },
      {
        title: 'Product Dimension Guide',
        description: 'Comprehensive guide to all furniture dimensions and measurements.',
        icon: FileText,
        cta: 'View Guide',
      },
      {
        title: 'Material Care Comparison Chart',
        description: 'Quick reference for caring for different furniture materials.',
        icon: FileText,
        cta: 'Download Chart',
      },
    ],
  };

  const currentCategory = categories.find(c => c.id === selectedCategory);
  const CategoryIcon = currentCategory?.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <BookOpen className="h-12 w-12 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-3">Help Center & Resources</h1>
          <p className="text-blue-100 text-lg">Learn how to choose, assemble, and care for your furniture</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Category Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = cat.id === selectedCategory;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`p-4 rounded-lg transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-900 border border-gray-200 hover:border-blue-300'
                }`}
              >
                <Icon className="h-6 w-6 mx-auto mb-2" />
                <p className="text-sm font-medium text-center">{cat.label}</p>
              </button>
            );
          })}
        </div>

        {/* Content Grid */}
        {selectedCategory !== 'resources' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content[selectedCategory as keyof typeof content]?.map((item: any, idx) => (
              <Card key={idx} className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer group overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </div>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </CardHeader>
                <CardContent className="pt-0 pb-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className="text-xs">{item.readTime}</Badge>
                    <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                      {item.level}
                    </Badge>
                  </div>
                  {item.videoUrl && (
                    <div className="flex items-center gap-2 text-blue-600 font-medium text-sm group-hover:text-blue-700">
                      <PlayCircle className="h-4 w-4" />
                      Watch Video
                    </div>
                  )}
                </CardContent>
                <Button
                  className="w-full rounded-t-none bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => {
                    /* Open full article */
                  }}
                >
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.resources.map((item: any, idx) => {
              const Icon = item.icon;
              return (
                <Card key={idx} className="border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                  <CardContent className="p-6">
                    <Icon className="h-10 w-10 text-blue-600 mb-4" />
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm mb-6">{item.description}</p>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      {item.cta}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-12 text-center border border-blue-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Can't find what you need?</h3>
          <p className="text-gray-600 mb-6">Our support team is ready to help with any questions</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" size="lg">
              Contact Support
            </Button>
            <Button variant="outline" size="lg">
              Live Chat
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
