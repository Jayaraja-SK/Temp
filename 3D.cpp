#include <GL/glut.h>
#include <iostream>
#include <cmath>
#include <cstring>

using namespace std;


float cube[6][4][4] = {
                        {{-100,100,100,1},{100,100,100,1},{100,-100,100,1},{-100,-100,100,1}},
                        {{-100,100,-100,1},{100,100,-100,1},{100,-100,-100,1},{-100,-100,-100,1}},
                        {{-100,100,-100,1},{-100,100,100,1},{-100,-100,100,1},{-100,-100,-100,1}},
                        {{100,100,-100,1},{100,100,100,1},{100,-100,100,1},{100,-100,-100,1}},
                        {{-100,-100,-100,1},{100,-100,-100,1},{100,-100,100,1},{-100,-100,100,1}},
                        {{-100,100,-100,1},{100,100,-100,1},{100,100,100,1},{-100,100,100,1}}
                    }; 

                    // FRONT, BACK, LEFT, RIGHT, BOTTOM, TOP

float cubeColor[6][4] = {
                            {1,0,0,0.75},
                            {0,1,0,0.75},
                            {0,0,1,0.75},
                            {1,1,0,0.75},
                            {0,1,1,0.75},
                            {1,0,1,0.75}
                      };


void myInit() {
    glClearColor(1.0,1.0,1.0,1.0);
    glOrtho(-800,800,-800,800,-800,800);
    glEnable(GL_DEPTH_TEST);
    
    glRotatef(50,1,0,0);
    glRotatef(50,0,1,0);
    glRotatef(50,0,0,1);

    glEnable(GL_BLEND);
    glDepthMask(GL_FALSE);
    glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
}


void plotPointString(int x, int y, int pos)
{
    glRasterPos2f(x,y+pos);

    std::string string;
    
    string="("+std::to_string(int(round(x)))+","+std::to_string(int(round(y)))+")";

    char *s=const_cast<char*>(string.c_str());

    for (char* c = s; *c != '\0'; c++)
            glutBitmapCharacter(GLUT_BITMAP_HELVETICA_10 , *c);
}



void plotPoint(int x, int y)
{
    glBegin(GL_POINTS);
    glVertex2f(x,y);
    glEnd();
}


void drawCube()
{
    int i,j;

    glClear(GL_COLOR_BUFFER_BIT|GL_DEPTH_BUFFER_BIT);


    for(i=0;i<6;i++)
    {
        glColor4f(cubeColor[i][0],cubeColor[i][1],cubeColor[i][2],cubeColor[i][3]);

        glBegin(GL_POLYGON);

        for(j=0;j<4;j++)
        {
            glVertex3f(cube[i][j][0],cube[i][j][1],cube[i][j][2]);
        }

        glEnd();
    }
    
    glFlush();
}


void computePoints(float matrix[4][4])
{
    int i,j,k;

    for(i=0;i<6;i++)
    {
        for(j=0;j<4;j++)
        {
            float point[4] = {cube[i][j][0], cube[i][j][1], cube[i][j][2], cube[i][j][3]};

            for(k=0;k<4;k++)
            {
                cube[i][j][k] = matrix[k][0]*point[0] + matrix[k][1]*point[1] + matrix[k][2]*point[2] + matrix[k][3]*point[3];
            }

        }
    }
}


void Translate()
{
    float tx, ty, tz;

    cout << "tx = ";
    cin >> tx;
    cout << "ty = ";
    cin >> ty;
    cout << "tz = ";
    cin >> tz;
    cout << "\n";

    float translate[4][4] = {
                            {1,0,0,tx},
                            {0,1,0,ty},
                            {0,0,1,tz},
                            {0,0,0,1},
                        };

    computePoints(translate);
}



void Scaling()
{
    float sx, sy, sz;

    cout << "sx = ";
    cin >> sx;
    cout << "sy = ";
    cin >> sy;
    cout << "sz = ";
    cin >> sz;
    cout << "\n";

    float scale[4][4] = {
                            {sx,0,0,0},
                            {0,sy,0,0},
                            {0,0,sz,0},
                            {0,0,0,1},
                        };

    computePoints(scale);
}


void RotationX()
{
    float angle;

    cout << "angle = ";
    cin >> angle;
    cout << "\n";

    angle = (angle*3.14)/180;

    float rotation[4][4] = {
                            {1,0,0,0},
                            {0,cos(angle),-sin(angle),0},
                            {0,sin(angle),cos(angle),0},
                            {0,0,0,1},
                        };

    computePoints(rotation);
}


void RotationY()
{
    float angle;

    cout << "angle = ";
    cin >> angle;
    cout << "\n";

    angle = (angle*3.14)/180;

    float rotation[4][4] = {
                            {cos(angle),0,sin(angle),0},
                            {0,1,0,0},
                            {-sin(angle),0,cos(angle),0},
                            {0,0,0,1},
                        };

    computePoints(rotation);
}


void RotationZ()
{
    float angle;

    cout << "angle = ";
    cin >> angle;
    cout << "\n";

    angle = (angle*3.14)/180;

    float rotation[4][4] = {
                            {cos(angle),-sin(angle),0,0},
                            {sin(angle),cos(angle),0,0},
                            {0,0,1,0},
                            {0,0,0,1},
                        };

    computePoints(rotation);
}


void ReflectionXY()
{
    float reflection[4][4] = {
                            {1,0,0,0},
                            {0,1,0,0},
                            {0,0,-1,0},
                            {0,0,0,1},
                        };

    computePoints(reflection);
}


void ReflectionYZ()
{
    float reflection[4][4] = {
                            {-1,0,0,0},
                            {0,1,0,0},
                            {0,0,1,0},
                            {0,0,0,1},
                        };

    computePoints(reflection);
}


void ReflectionZX()
{
    float reflection[4][4] = {
                            {1,0,0,0},
                            {0,-1,0,0},
                            {0,0,1,0},
                            {0,0,0,1},
                        };

    computePoints(reflection);
}


void ShearX()
{
    float shy, shz;

    cout << "shy = ";
    cin >> shy;
    cout << "shz = ";
    cin >> shz;
    cout << "\n";

    float shear[4][4] = {
                            {1,0,0,0},
                            {shy,1,0,0},
                            {shz,0,1,0},
                            {0,0,0,1},
                        };

    computePoints(shear);
}



void ShearY()
{
    float shx, shz;

    cout << "shx = ";
    cin >> shx;
    cout << "shz = ";
    cin >> shz;
    cout << "\n";

    float shear[4][4] = {
                            {1,shx,0,0},
                            {0,1,0,0},
                            {0,shz,1,0},
                            {0,0,0,1},
                        };

    computePoints(shear);
}


void ShearZ()
{
    float shx, shy;

    cout << "shx = ";
    cin >> shx;
    cout << "shy = ";
    cin >> shy;
    cout << "\n";

    float shear[4][4] = {
                            {1,0,shx,0},
                            {0,1,shy,0},
                            {0,0,1,0},
                            {0,0,0,1},
                        };

    computePoints(shear);
}


void Transformation()
{

    drawCube();


    while(1)
    {
        cout << "\t\tMENU\n";
        cout << "1. TRANSLATION\n";
        cout << "2. SCALING\n";
        cout << "3. ROTATION-X\n";
        cout << "4. ROTATION-Y\n";
        cout << "5. ROTATION-Z\n";
        cout << "6. REFLECTION-XY\n";
        cout << "7. REFLECTION-YZ\n";
        cout << "8. REFLECTION-ZX\n";
        cout << "9. SHEAR-X\n";
        cout << "10. SHEAR-Y\n";
        cout << "11. SHEAR-Z\n\n";

        int choice;
        cout << "ENTER CHOICE = ";
        cin >> choice;
        cout << "\n";

        if(choice==1)
        {
            Translate();
        }
        else if(choice==2)
        {
            Scaling();
        }
        else if(choice==3)
        {
            RotationX();
        }
        else if(choice==4)
        {
            RotationY();
        }
        else if(choice==5)
        {
            RotationZ();
        }
        else if(choice==6)
        {
            ReflectionXY();
        }
        else if(choice==7)
        {
            ReflectionYZ();
        }
        else if(choice==8)
        {
            ReflectionZX();
        }
        else if(choice==9)
        {
            ShearX();
        }
        else if(choice==10)
        {
            ShearY();
        }
        else if(choice==11)
        {
            ShearZ();
        }
        else
        {
            break;
        }

        drawCube();
    }

    
}




int main(int argc,char* argv[])
{
    glutInit(&argc,argv);
    glutInitDisplayMode(GLUT_SINGLE|GLUT_RGB);
    glutInitWindowSize(640,480);
    glutCreateWindow("Eight Exercise");
    glutDisplayFunc(Transformation);
    myInit();
    glutMainLoop();
    return 1;
}