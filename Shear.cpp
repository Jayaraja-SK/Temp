#include <GL/glut.h>
#include <iostream>
#include <cmath>
#include <cstring>

using namespace std;


void myInit() {
    glClearColor(1.0,1.0,1.0,0.0);
    glColor3f(0.0f,0.0f,0.0f);
    glPointSize(10);
    glMatrixMode(GL_PROJECTION);
    glLoadIdentity();
    gluOrtho2D(-10.0,10.0,-10.0,10.0);
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


float ShearX(float x, float y, float shx, float yref)
{
    float x_1;

    x_1 = x + shx*(y-yref);

    return x_1;
}


float ShearY(float x, float y, float shy, float xref)
{
    float y_1;

    y_1 = y + shy*(x-xref);

    return y_1;
}



void SquareShearX(float xa, float ya, float xb, float yb, float shx, float yref)
{
    glBegin(GL_QUADS);
    glVertex3f(ShearX(xa, ya, shx, yref),ya,0.0f);
    glVertex3f(ShearX(xb, ya, shx, yref),ya,0.0f);
    glVertex3f(ShearX(xb, yb, shx, yref),yb,0.0f);
    glVertex3f(ShearX(xa, yb, shx, yref),yb,0.0f);
    glEnd();
    glFlush();
}


void SquareShearY(float xa, float ya, float xb, float yb, float shy, float xref)
{
    glBegin(GL_QUADS);
    glVertex3f(xa,ShearY(xa, ya, shy, xref),0.0f);
    glVertex3f(xb,ShearY(xb, ya, shy, xref),0.0f);
    glVertex3f(xb,ShearY(xb, yb, shy, xref),0.0f);
    glVertex3f(xa,ShearY(xa, yb, shy, xref),0.0f);
    glEnd();
    glFlush();
}



void Shear()
{
    glClear(GL_COLOR_BUFFER_BIT);
    
    glRasterPos2f(0.0f,0.0f);

    plotPointString(0,0,0);

    glLineWidth(2);
    glPointSize(7);
    glBegin(GL_LINES);
    
    glVertex3f(-320.0f,0.0f,0.0f);
    glVertex3f(320.0f,0.0f,0.0f);

    glEnd();

    

    glLineWidth(2);

    glBegin(GL_LINES);

    glVertex3f(0.0f,-240.0f,0.0f);
    glVertex3f(0.0f,240.0f,0.0f);

    glEnd();
    
    float xa, ya, xb, yb, shx, shy, xref, yref;


    cout << "xa = ";
    cin >> xa;
    cout << "ya = ";
    cin >> ya;

    cout << "xb = ";
    cin >> xb;
    cout << "yb = ";
    cin >> yb;

    cout << "\n";

    cout << "shx = ";
    cin >> shx;
    cout << "yref = ";
    cin >> yref;

    cout << "\n";

    cout << "shy = ";
    cin >> shy;
    cout << "xref = ";
    cin >> xref;


    glColor3f(1.0f,0.0f,0.0f);
    SquareShearX(xa, ya, xb, yb, 0, 0);
    
    
    glColor3f(0.0f,0.0f,1.0f);
    SquareShearX(xa, ya, xb, yb, shx, yref);

    glColor3f(0.0f,1.0f,0.0f);
    SquareShearY(xa, ya, xb, yb, shy, xref);
}


int main(int argc,char* argv[])
{
    glutInit(&argc,argv);
    glutInitDisplayMode(GLUT_SINGLE|GLUT_RGB);
    glutInitWindowSize(640,480);
    glutCreateWindow("Fifth Exercise");
    glutDisplayFunc(Shear);
    myInit();
    glutMainLoop();
    return 1;
}