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


float ScaleX(float x, float sx, float xf)
{
    float x_1;

    x_1 = (x*sx) + xf*(1-sx);

    return x_1;
}


float ScaleY(float y, float sy, float yf)
{
    float y_1;

    y_1 = (y*sy) + yf*(1-sy);

    return y_1;
}



void Square(float xa, float ya, float xb, float yb, float xf, float yf, float sx, float sy)
{
    glBegin(GL_QUADS);
    glVertex3f(ScaleX(xa, sx, xf),ScaleY(ya, sy, yf),0.0f);
    glVertex3f(ScaleX(xb, sx, xf),ScaleY(ya, sy, yf),0.0f);
    glVertex3f(ScaleX(xb, sx, xf),ScaleY(yb, sy, yf),0.0f);
    glVertex3f(ScaleX(xa, sx, xf),ScaleY(yb, sy, yf),0.0f);
    glEnd();
    glFlush();
}



void Rotation()
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
    
    float xa, ya, xb, yb, xf, yf, sx,sy;


    cout << "xa = ";
    cin >> xa;
    cout << "ya = ";
    cin >> ya;

    cout << "xb = ";
    cin >> xb;
    cout << "yb = ";
    cin >> yb;

    cout << "\n";

    cout << "xf = ";
    cin >> xf;
    cout << "yf = ";
    cin >> yf;

    cout << "\n";

    cout << "sx = ";
    cin >> sx;
    cout << "sy = ";
    cin >> sy;


    glColor3f(1.0f,0.0f,0.0f);
    Square(xa, ya, xb, yb, 0, 0, 1, 1);
    
    
    glColor3f(0.0f,0.0f,1.0f);
    Square(xa, ya, xb, yb, xf, yf, sx, sy);
}


int main(int argc,char* argv[])
{
    glutInit(&argc,argv);
    glutInitDisplayMode(GLUT_SINGLE|GLUT_RGB);
    glutInitWindowSize(640,480);
    glutCreateWindow("Fifth Exercise");
    glutDisplayFunc(Rotation);
    myInit();
    glutMainLoop();
    return 1;
}